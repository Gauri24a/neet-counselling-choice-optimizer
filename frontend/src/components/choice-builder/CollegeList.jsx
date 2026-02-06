/**
 * PRD §4.1: Display colleges by tier (Safe / Target / Dream).
 */
function formatFee(rupees) {
  if (rupees == null) return '–';
  if (rupees >= 100000) return `₹${(rupees / 100000).toFixed(1)}L`;
  if (rupees >= 1000) return `₹${(rupees / 1000).toFixed(0)}K`;
  return `₹${rupees}`;
}

export default function CollegeList({ items, tierLabel, tierEmoji }) {
  if (!items?.length) return null;
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {tierEmoji} {tierLabel} ({items.length})
      </h3>
      <ul className="space-y-2">
        {items.map((row) => {
          const college = row.college || row;
          return (
            <li
              key={college.id}
              className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-start gap-2"
            >
              <div>
                <p className="font-medium text-gray-900">{college.name}</p>
                <p className="text-sm text-gray-500">
                  {college.type} · {college.state_code} · {formatFee(college.annual_fee)}/year
                  {college.nirf_rank != null && ` · NIRF ${college.nirf_rank}`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
