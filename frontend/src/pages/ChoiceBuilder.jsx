/**
 * PRD §4.1: Build Your Choice List – Safe/Target/Dream, suggested order, validation.
 */
import { useLocation, useNavigate } from 'react-router-dom';
import CollegeList from '../components/choice-builder/CollegeList';
import ListValidation from '../components/choice-builder/ListValidation';

const TIER_CONFIG = [
  { key: 'safe', label: 'Safe Zone', emoji: '🎯' },
  { key: 'target', label: 'Target Zone', emoji: '⚡' },
  { key: 'dream', label: 'Dream Zone', emoji: '🚀' },
];

export default function ChoiceBuilder() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No choice list data. Please start from the form.</p>
        <button
          type="button"
          onClick={() => navigate('/input-details')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Input Details
        </button>
      </div>
    );
  }

  const { safe, target, dream, suggestedOrder, validation } = result;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Choice List</h2>
      <ListValidation validation={validation} />
      <div className="mt-6">
        {TIER_CONFIG.map(({ key, label, emoji }) => (
          <CollegeList
            key={key}
            items={result[key]}
            tierLabel={label}
            tierEmoji={emoji}
          />
        ))}
      </div>
      {suggestedOrder?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Suggested order (top choices)</h3>
          <ol className="list-decimal list-inside space-y-2">
            {suggestedOrder.slice(0, 30).map((item, i) => (
              <li key={i} className="p-2 bg-white border border-gray-200 rounded">
                <span className="font-medium">{item.college?.name}</span>
                <span className="text-sm text-gray-500 ml-2">({item.tier})</span>
              </li>
            ))}
          </ol>
          {suggestedOrder.length > 30 && (
            <p className="mt-2 text-sm text-gray-500">… and {suggestedOrder.length - 30} more</p>
          )}
        </div>
      )}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => navigate('/input-details')}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Change inputs
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
