/**
 * API client. Backend base URL from Vite proxy or env.
 */
const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * POST /api/choice-optimizer/generate
 * @param {Object} body - { rank, category, stateCode, budgetRange?, priorities? }
 * @returns {Promise<{ safe, target, dream, suggestedOrder, validation }>}
 */
export async function postChoiceOptimizerGenerate(body) {
  const res = await fetch(`${API_BASE}/api/choice-optimizer/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || data.message || 'Request failed');
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}
