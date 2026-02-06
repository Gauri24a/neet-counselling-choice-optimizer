/**
 * PRD §4.1: Visual validation – balanced, top-heavy, bottom-heavy, warnings.
 */
export default function ListValidation({ validation }) {
  if (!validation) return null;
  const { balanced, warnings } = validation;
  return (
    <div className={`p-4 rounded-lg ${balanced ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
      <p className={`font-medium ${balanced ? 'text-green-800' : 'text-amber-800'}`}>
        {balanced ? 'Your list looks balanced ✓' : 'Review suggestions'}
      </p>
      {warnings?.length > 0 && (
        <ul className="mt-2 list-disc list-inside text-sm text-amber-800 space-y-1">
          {warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
