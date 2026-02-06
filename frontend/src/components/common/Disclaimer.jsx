/**
 * PRD §12.1: Mandatory disclaimer on every page.
 */
export default function Disclaimer() {
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
      <p className="font-medium">Important Notice</p>
      <p className="mt-1">
        This is an educational project and decision-support tool. It does not guarantee admission to any college.
        All predictions are based on historical data and may not reflect current year trends. Always verify
        information with official counselling authorities. We are not responsible for any admission or financial
        decisions made using this platform.
      </p>
    </div>
  );
}
