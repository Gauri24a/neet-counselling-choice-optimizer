import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Page not found</h2>
      <Link to="/" className="text-indigo-600 hover:text-indigo-800">
        Back to home
      </Link>
    </div>
  );
}
