//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Dashboard/DashboardLayout.jsx


// import { Outlet, Link } from 'react-router-dom';

// const DashboardLayout = () => (
//   <div className="flex">
//     <nav className="w-1/4 p-4 bg-gray-100">
//       <Link to="listings" className="block mb-2">My Listings</Link>
//       <Link to="add" className="block mb-2">Add Car</Link>
//       <Link to="settings" className="block mb-2">Settings</Link>
//     </nav>
//     <div className="w-3/4 p-4">
//       <Outlet />
//     </div>
//   </div>
// );

// export default DashboardLayout;


// client/src/components/Dashboard/DashboardLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 w-full bg-gray-100 border-r px-6 py-6 md:h-auto">
        <nav className="space-y-1">
          <NavLink
            to="listings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded font-medium ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
              }`
            }
          >
            My Listings
          </NavLink>
          <NavLink
            to="add"
            className={({ isActive }) =>
              `block px-4 py-2 rounded font-medium ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
              }`
            }
          >
            Add Car
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded font-medium ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-white overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
