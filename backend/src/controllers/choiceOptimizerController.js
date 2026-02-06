/**
 * Choice optimizer controller (PRD §4.1).
 * POST /api/choice-optimizer/generate → getTiersAndSuggestedOrder.
 */
const choiceOptimizer = require('../services/choiceOptimizer');
const { getCollegesWithCutoffs, VALID_CATEGORIES } = require('../models/college');

const BUDGET_RANGES = ['0-2L', '2-5L', '5-10L', '10L+'];

/**
 * Validate generate request body (PRD §4.1 inputs).
 * @param {Object} body
 * @returns {{ valid: boolean, message?: string, params?: Object }}
 */
function validateGenerateBody(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, message: 'Request body is required' };
  }
  const rank = body.rank;
  if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1) {
    return { valid: false, message: 'rank must be a positive integer' };
  }
  const category = body.category;
  if (!category || !VALID_CATEGORIES.includes(String(category).toUpperCase())) {
    return { valid: false, message: `category must be one of: ${VALID_CATEGORIES.join(', ')}` };
  }
  const stateCode = body.stateCode;
  if (!stateCode || typeof stateCode !== 'string' || stateCode.trim() === '') {
    return { valid: false, message: 'stateCode is required' };
  }
  const budgetRange = body.budgetRange;
  if (budgetRange != null && !BUDGET_RANGES.includes(budgetRange)) {
    return { valid: false, message: `budgetRange must be one of: ${BUDGET_RANGES.join(', ')}` };
  }
  const priorities = body.priorities;
  if (priorities != null && (typeof priorities !== 'object' || Array.isArray(priorities))) {
    return { valid: false, message: 'priorities must be an object' };
  }
  const params = {
    rank: Number(rank),
    category: String(category).toUpperCase(),
    stateCode: String(stateCode).trim(),
    budgetRange: budgetRange || undefined,
    priorities: priorities && typeof priorities === 'object' ? priorities : undefined,
  };
  return { valid: true, params };
}

/**
 * POST /api/choice-optimizer/generate
 * Body: { rank, category, stateCode, [budgetRange], [priorities] }
 * Response: { safe, target, dream, suggestedOrder, validation }
 */
async function generate(req, res) {
  const validation = validateGenerateBody(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }
  const params = validation.params;
  try {
    const collegesWithCutoffs = await getCollegesWithCutoffs(params.category);
    const result = choiceOptimizer.getTiersAndSuggestedOrder(params, collegesWithCutoffs);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate choice list', message: err.message });
  }
}

module.exports = { generate, validateGenerateBody };
