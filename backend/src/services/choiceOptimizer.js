/**
 * Choice List Optimization logic (PRD §4.1, Appendix B).
 * Pure business logic: accepts colleges with cutoffs and user params; returns
 * tiers, suggested order, and validation. Data fetching is done by controller/model.
 */

// -----------------------------------------------------------------------------
// Constants (PRD §4.1, Appendix B)
// -----------------------------------------------------------------------------
const TIER_SAFE = 'SAFE';
const TIER_TARGET = 'TARGET';
const TIER_DREAM = 'DREAM';

/** PRD Appendix B: "Fetch all colleges where user's rank <= (last_3_years_max_cutoff * 1.1)" */
const RANK_REACH_MULTIPLIER = 1.1;

/** PRD §4.1: "Place safe colleges in bottom 30 choices" / "Suggest ordering: Top 20% dreams, Middle 50% targets, Bottom 30% safe" */
const SUGGEST_DREAM_TOP_PERCENT = 0.2;
const SUGGEST_TARGET_MIDDLE_PERCENT = 0.5;
const SUGGEST_SAFE_BOTTOM_PERCENT = 0.3;

/** PRD Appendix B step 5: "Validate: Check if safe zone >= 20 colleges, warn if not" */
const MIN_SAFE_COLLEGES = 20;

/** PRD §4.1: "Place dream colleges in top 20 choices" - used for top-heavy check */
const DREAM_TOP_THRESHOLD = 20;

/**
 * Budget band max fees in rupees (PRD §4.1: ₹0-2L, 2-5L, 5-10L, 10L+).
 * Used to filter colleges by annual_fee.
 */
const BUDGET_MAX_RUPEES = {
  '0-2L': 200_000,
  '2-5L': 500_000,
  '5-10L': 1_000_000,
  '10L+': Number.MAX_SAFE_INTEGER,
};

// -----------------------------------------------------------------------------
// Helpers: cutoff stats per college (last 3 years, same category)
// -----------------------------------------------------------------------------

/**
 * Compute mean and standard deviation of closing_rank for a college.
 * @param {Array<{ year: number, closing_rank: number }>} cutoffs - closing ranks (same category)
 * @returns {{ avg: number, stdDev: number, count: number } | null} - null if insufficient data
 */
function cutoffStats(cutoffs) {
  if (!cutoffs?.length) return null;
  const values = cutoffs.map((c) => c.closing_rank).filter((n) => typeof n === 'number');
  if (values.length === 0) return null;
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  const variance = values.reduce((s, v) => s + (v - avg) ** 2, 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return { avg, stdDev, count: values.length };
}

/**
 * PRD Appendix B step 1: Include only colleges where user's rank is within reach.
 * "user's rank <= (last_3_years_max_cutoff * 1.1)"
 * @param {Array} collegesWithCutoffs - each item: { ...college, cutoffs: [{ year, closing_rank }] }
 * @param {number} userRank
 * @returns {Array} filtered list
 */
function filterByReach(collegesWithCutoffs, userRank) {
  return collegesWithCutoffs.filter((row) => {
    const stats = cutoffStats(row.cutoffs);
    if (!stats) return false;
    const maxCutoff = Math.max(...row.cutoffs.map((c) => c.closing_rank));
    return userRank <= maxCutoff * RANK_REACH_MULTIPLIER;
  });
}

/**
 * PRD Appendix B step 2: Categorize into Safe / Target / Dream by rank vs historical cutoff.
 * Safe: Rank < (avg_cutoff - 2*std_dev)
 * Target: Rank within 1 std_dev of avg_cutoff
 * Dream: Rank > avg_cutoff
 * @param {Array} collegesWithCutoffs - filtered by reach
 * @param {number} userRank
 * @returns {{ safe: Array, target: Array, dream: Array }}
 */
function categorizeByTier(collegesWithCutoffs, userRank) {
  const safe = [];
  const target = [];
  const dream = [];

  for (const row of collegesWithCutoffs) {
    const stats = cutoffStats(row.cutoffs);
    if (!stats) continue;

    const { avg, stdDev } = stats;
    const collegeWithMeta = {
      ...row,
      _avgClosingRank: avg,
      _stdDev: stdDev,
    };

    if (userRank < avg - 2 * stdDev) {
      safe.push(collegeWithMeta);
    } else if (userRank <= avg + stdDev && userRank >= avg - stdDev) {
      target.push(collegeWithMeta);
    } else if (userRank > avg) {
      dream.push(collegeWithMeta);
    }
    // else: between (avg - stdDev) and avg → treat as target (borderline)
    else {
      target.push(collegeWithMeta);
    }
  }

  return { safe, target, dream };
}

/**
 * PRD §4.1: Priority sliders 0–10 → score per college.
 * governmentPreference, stayCloseToHome, collegeReputation, feeAffordability, specificStatePreference.
 * Higher score = better match. NIRF: lower rank = better (invert). Fee: lower = better for affordability.
 * @param {Object} college - id, name, type, state_code, annual_fee, nirf_rank, ...
 * @param {Object} priorities - 0–10 each
 * @param {string} userStateCode - for stay close / state match
 * @param {number} budgetMaxRupees - max fee user can afford (for fee score)
 * @returns {number} priority score
 */
function priorityScore(college, priorities, userStateCode, budgetMaxRupees) {
  const p = priorities || {};
  let score = 0;

  // Government preference (0–10): GOVT gets full weight
  const govWeight = (typeof p.governmentPreference === 'number' ? p.governmentPreference : 5) / 10;
  if (college.type === 'GOVT') score += 10 * govWeight;
  else if (college.type === 'DEEMED') score += 3 * govWeight;
  else score += 0;

  // Stay close to home + specific state preference (0–10): same state gets one combined weight (PRD §4.1)
  const stayWeight = (typeof p.stayCloseToHome === 'number' ? p.stayCloseToHome : 5) / 10;
  const statePrefWeight = (typeof p.specificStatePreference === 'number' ? p.specificStatePreference : 5) / 10;
  const stateWeight = Math.max(stayWeight, statePrefWeight);
  if (userStateCode && college.state_code === userStateCode) score += 10 * stateWeight;

  // College reputation (0–10): lower NIRF rank = better. No NIRF => neutral
  const repWeight = (typeof p.collegeReputation === 'number' ? p.collegeReputation : 5) / 10;
  if (typeof college.nirf_rank === 'number') {
    const nirfScore = Math.max(0, 10 - (college.nirf_rank - 1) / 50);
    score += nirfScore * repWeight;
  }

  // Fee affordability (0–10): lower fee within budget = better
  const feeWeight = (typeof p.feeAffordability === 'number' ? p.feeAffordability : 5) / 10;
  if (budgetMaxRupees > 0 && college.annual_fee != null) {
    const ratio = Math.min(1, 1 - college.annual_fee / budgetMaxRupees);
    score += 10 * ratio * feeWeight;
  }

  return score;
}

/**
 * PRD Appendix B step 3: Sort within each category by user's priority weights.
 * @param {Array} list - array of college objects (with college fields)
 * @param {Object} priorities - 0–10 sliders
 * @param {string} userStateCode
 * @param {number} budgetMaxRupees
 * @returns {Array} sorted (same references, new order)
 */
function sortByPriorities(list, priorities, userStateCode, budgetMaxRupees) {
  const budgetMax = budgetMaxRupees ?? Number.MAX_SAFE_INTEGER;
  return [...list].sort((a, b) => {
    const scoreA = priorityScore(a, priorities, userStateCode, budgetMax);
    const scoreB = priorityScore(b, priorities, userStateCode, budgetMax);
    return scoreB - scoreA;
  });
}

/**
 * PRD Appendix B step 4: Suggest ordering — Top 20% dreams, Middle 50% targets, Bottom 30% safe.
 * Returns a single ordered array with tier and position metadata for UI.
 * @param {{ safe: Array, target: Array, dream: Array }} tiers - each already sorted by priorities
 * @returns {Array<{ college: Object, tier: string, suggestedPosition: number }>}
 */
function suggestOrdering(tiers) {
  const { safe, target, dream } = tiers;
  const ordered = [];
  let position = 1;

  const nDream = dream.length;
  const nTarget = target.length;
  const nSafe = safe.length;
  const total = nDream + nTarget + nSafe;
  if (total === 0) return ordered;

  const nDreamTop = Math.max(0, Math.round(total * SUGGEST_DREAM_TOP_PERCENT));
  const nTargetMid = Math.max(0, Math.round(total * SUGGEST_TARGET_MIDDLE_PERCENT));
  const nSafeBottom = Math.max(0, Math.round(total * SUGGEST_SAFE_BOTTOM_PERCENT));

  const take = (arr, k) => arr.slice(0, k);
  const dreamTop = take(dream, Math.min(nDreamTop, nDream));
  const targetMid = take(target, Math.min(nTargetMid, nTarget));
  const safeBottom = take(safe, Math.min(nSafeBottom, nSafe));
  const restDream = dream.slice(dreamTop.length);
  const restTarget = target.slice(targetMid.length);
  const restSafe = safe.slice(safeBottom.length);

  const withTier = (arr, tier) => arr.map((college) => ({ college, tier }));
  const combined = [
    ...withTier(dreamTop, TIER_DREAM),
    ...withTier(restDream, TIER_DREAM),
    ...withTier(targetMid, TIER_TARGET),
    ...withTier(restTarget, TIER_TARGET),
    ...withTier(safeBottom, TIER_SAFE),
    ...withTier(restSafe, TIER_SAFE),
  ];

  for (const { college, tier } of combined) {
    ordered.push({ college, tier, suggestedPosition: position++ });
  }

  return ordered;
}

/**
 * PRD §4.1: Visual validation — top-heavy (too many dreams), bottom-heavy (too conservative), safe count.
 * Appendix B step 5: Warn if safe zone < 20 colleges.
 * @param {{ safe: Array, target: Array, dream: Array }} tiers
 * @param {Array} orderedList - optional; if provided, check first DREAM_TOP_THRESHOLD positions for dream count
 * @returns {{ balanced: boolean, warnings: string[] }}
 */
function validateList(tiers, orderedList = []) {
  const warnings = [];
  const { safe, target, dream } = tiers;

  if (safe.length < MIN_SAFE_COLLEGES) {
    warnings.push(`Safe zone has ${safe.length} colleges. Recommend at least ${MIN_SAFE_COLLEGES} for a balanced list.`);
  }

  if (orderedList.length > 0) {
    const topSlice = orderedList.slice(0, DREAM_TOP_THRESHOLD);
    const dreamInTop = topSlice.filter((o) => o.tier === TIER_DREAM).length;
    const safeInTop = topSlice.filter((o) => o.tier === TIER_SAFE).length;
    if (dreamInTop > 12) {
      warnings.push('List is top-heavy: too many dream colleges in the top choices. Consider moving some targets/safe options higher.');
    }
    if (safeInTop > 5) {
      warnings.push('List is bottom-heavy: safe colleges appear very high. Consider placing more dream/target options in top choices.');
    }
  }

  return {
    balanced: warnings.length === 0,
    warnings,
  };
}

/**
 * Map budget range label to max rupees (PRD §4.1).
 * @param {string} budgetRange - '0-2L' | '2-5L' | '5-10L' | '10L+'
 * @returns {number}
 */
function budgetMaxFromRange(budgetRange) {
  if (typeof budgetRange === 'string' && budgetRange in BUDGET_MAX_RUPEES) {
    return BUDGET_MAX_RUPEES[budgetRange];
  }
  return Number.MAX_SAFE_INTEGER;
}

/**
 * Filter colleges by budget (annual_fee <= budget max).
 * @param {Array} collegesWithCutoffs - each has annual_fee
 * @param {number} budgetMaxRupees
 * @returns {Array}
 */
function filterByBudget(collegesWithCutoffs, budgetMaxRupees) {
  if (budgetMaxRupees == null || budgetMaxRupees === Number.MAX_SAFE_INTEGER) return collegesWithCutoffs;
  return collegesWithCutoffs.filter((c) => c.annual_fee != null && c.annual_fee <= budgetMaxRupees);
}

// -----------------------------------------------------------------------------
// Public API (used by choiceOptimizerController)
// -----------------------------------------------------------------------------

/**
 * Get colleges categorized into Safe / Target / Dream and suggested ordering.
 * Caller is responsible for fetching colleges + cutoffs for the user's category and filtering by authority/state if needed.
 *
 * @param {Object} params - user inputs (PRD §4.1)
 * @param {number} params.rank - NEET rank
 * @param {string} params.category - GEN | OBC | SC | ST | EWS
 * @param {string} params.stateCode - home state code (e.g. MH, KA)
 * @param {string} [params.budgetRange] - '0-2L' | '2-5L' | '5-10L' | '10L+'
 * @param {Object} [params.priorities] - 0–10: governmentPreference, stayCloseToHome, collegeReputation, feeAffordability, specificStatePreference
 * @param {Array} collegesWithCutoffs - array of { id, name, type, state_code, annual_fee, seats_total, nirf_rank, cutoffs: [{ year, closing_rank }] }
 * @returns {{
 *   safe: Array,
 *   target: Array,
 *   dream: Array,
 *   suggestedOrder: Array<{ college, tier, suggestedPosition }>,
 *   validation: { balanced, warnings }
 * }}
 */
function getTiersAndSuggestedOrder(params, collegesWithCutoffs) {
  const { rank, stateCode, budgetRange, priorities } = params;
  const budgetMax = budgetMaxFromRange(budgetRange);

  let list = Array.isArray(collegesWithCutoffs) ? [...collegesWithCutoffs] : [];
  list = filterByBudget(list, budgetMax);
  list = filterByReach(list, rank);

  const tiers = categorizeByTier(list, rank);
  tiers.safe = sortByPriorities(tiers.safe, priorities, stateCode, budgetMax);
  tiers.target = sortByPriorities(tiers.target, priorities, stateCode, budgetMax);
  tiers.dream = sortByPriorities(tiers.dream, priorities, stateCode, budgetMax);

  const suggestedOrder = suggestOrdering(tiers);
  const validation = validateList(tiers, suggestedOrder);

  return {
    safe: tiers.safe,
    target: tiers.target,
    dream: tiers.dream,
    suggestedOrder,
    validation,
  };
}

/**
 * Validate an existing ordered list (e.g. after user drag-and-drop).
 * @param {{ safe: Array, target: Array, dream: Array }} tiers - same shape as getTiersAndSuggestedOrder
 * @param {Array<{ college, tier }>} orderedList - user's current order
 * @returns {{ balanced: boolean, warnings: string[] }}
 */
function validateOrderedList(tiers, orderedList) {
  return validateList(tiers, orderedList);
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------
module.exports = {
  TIER_SAFE,
  TIER_TARGET,
  TIER_DREAM,
  BUDGET_MAX_RUPEES,
  MIN_SAFE_COLLEGES,
  getTiersAndSuggestedOrder,
  validateOrderedList,
  filterByReach,
  categorizeByTier,
  sortByPriorities,
  suggestOrdering,
  validateList,
  priorityScore,
  cutoffStats,
  budgetMaxFromRange,
  filterByBudget,
};
