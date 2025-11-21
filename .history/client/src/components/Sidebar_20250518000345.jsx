

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen hidden md:block">
      <div className="p-4 font-bold text-xl border-b border-gray-700">
        AutoMarket25
      </div>
      <nav className="p-4 space-y-2">
        <Link to="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
        <Link to="/dashboard/cars" className="block hover:text-blue-400">My Cars</Link>
        <Link to="/dashboard/profile" className="block hover:text-blue-400">Profile</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
