/**
 * College + cutoffs for choice optimizer (PRD §4.1, §16 Appendix A).
 * Returns colleges with last-3-years cutoff data for a category.
 */
const { pool } = require('../db/connection');

const VALID_CATEGORIES = ['GEN', 'OBC', 'SC', 'ST', 'EWS'];

/**
 * Get all colleges with their cutoff history for the given category (last 3 years).
 * Shape: { id, name, type, state_code, annual_fee, seats_total, nirf_rank, cutoffs: [{ year, closing_rank }] }
 * @param {string} category - GEN | OBC | SC | ST | EWS
 * @returns {Promise<Array>}
 */
async function getCollegesWithCutoffs(category) {
  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }
  if (!pool) {
    return [];
  }
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 3;
  const result = await pool.query(
    `SELECT c.id, c.name, c.type, c.state_code, c.annual_fee, c.seats_total, c.nirf_rank,
            COALESCE(
              (SELECT json_agg(json_build_object('year', co.year, 'closing_rank', co.closing_rank))
               FROM cutoffs co
               WHERE co.college_id = c.id AND co.category = $1 AND co.year >= $2),
              '[]'::json
            ) AS cutoffs
     FROM colleges c
     ORDER BY c.id`,
    [category, minYear]
  );
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type,
    state_code: row.state_code,
    annual_fee: row.annual_fee,
    seats_total: row.seats_total,
    nirf_rank: row.nirf_rank,
    cutoffs: Array.isArray(row.cutoffs) ? row.cutoffs : [],
  }));
}

module.exports = { getCollegesWithCutoffs, VALID_CATEGORIES };
