/**
 * PRD §4.1: Input collection – rank, category, state, budget, priorities.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, BUDGET_RANGES, STATE_CODES } from '../../utils/constants';
import { getDefaultPriorities } from './PrioritySliders';
import PrioritySliders from './PrioritySliders';
import { postChoiceOptimizerGenerate } from '../../services/api';

export default function InputForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    rank: '',
    category: 'GEN',
    stateCode: 'MH',
    budgetRange: '5-10L',
    priorities: getDefaultPriorities(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const rank = Number(form.rank);
    if (!Number.isInteger(rank) || rank < 1) {
      setError('Please enter a valid positive rank.');
      return;
    }
    setLoading(true);
    try {
      const body = {
        rank,
        category: form.category,
        stateCode: form.stateCode,
        budgetRange: form.budgetRange,
        priorities: form.priorities,
      };
      const result = await postChoiceOptimizerGenerate(body);
      navigate('/choice-builder', { state: { result } });
    } catch (err) {
      setError(err.body?.error || err.message || 'Failed to generate choice list.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Input Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">
            NEET Rank <span className="text-red-500">*</span>
          </label>
          <input
            id="rank"
            type="number"
            min="1"
            required
            value={form.rank}
            onChange={(e) => setForm((f) => ({ ...f, rank: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700 mb-1">
            Home State
          </label>
          <select
            id="stateCode"
            value={form.stateCode}
            onChange={(e) => setForm((f) => ({ ...f, stateCode: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {STATE_CODES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
            Budget Range
          </label>
          <select
            id="budgetRange"
            value={form.budgetRange}
            onChange={(e) => setForm((f) => ({ ...f, budgetRange: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {BUDGET_RANGES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <PrioritySliders
          priorities={form.priorities}
          onChange={(priorities) => setForm((f) => ({ ...f, priorities }))}
        />
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating…' : 'Generate Choice List'}
        </button>
      </form>
    </div>
  );
}
