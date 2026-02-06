import { Outlet } from 'react-router-dom';
import Disclaimer from './Disclaimer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <a href="/" className="text-lg font-semibold text-indigo-700 hover:text-indigo-800">
          NEET Counselling Choice Optimizer
        </a>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 px-4 py-4 mt-auto">
        <Disclaimer />
      </footer>
    </div>
  );
}
