/**
 * PRD §4.1: Priorities (0–10 sliders).
 */
import { PRIORITY_LABELS } from '../../utils/constants';

const KEYS = [
  'governmentPreference',
  'stayCloseToHome',
  'collegeReputation',
  'feeAffordability',
  'specificStatePreference',
];

const DEFAULT_PRIORITIES = Object.fromEntries(KEYS.map((k) => [k, 5]));

export function getDefaultPriorities() {
  return { ...DEFAULT_PRIORITIES };
}

export default function PrioritySliders({ priorities, onChange }) {
  const value = priorities || DEFAULT_PRIORITIES;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Priorities (0–10)</h3>
      {KEYS.map((key) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">{PRIORITY_LABELS[key]}</label>
          <input
            type="range"
            min="0"
            max="10"
            value={value[key] ?? 5}
            onChange={(e) => onChange({ ...value, [key]: Number(e.target.value) })}
            className="w-full h-2 rounded-lg appearance-none bg-gray-200 accent-indigo-600"
          />
          <span className="text-xs text-gray-500">{value[key] ?? 5}</span>
        </div>
      ))}
    </div>
  );
}
