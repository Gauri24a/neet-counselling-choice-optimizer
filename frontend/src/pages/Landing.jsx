import { Link } from 'react-router-dom';

/**
 * PRD §7: Landing – "Create Your NEET Counselling Strategy in 30 Minutes", Get Started.
 */
export default function Landing() {
  return (
    <div className="text-center py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Create Your NEET Counselling Strategy in 30 Minutes
      </h1>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Build an optimized choice list, see Safe / Target / Dream colleges, and get a suggested order based on
        your rank, category, and preferences.
      </p>
      <Link
        to="/input-details"
        className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Get Started
      </Link>
    </div>
  );
}
