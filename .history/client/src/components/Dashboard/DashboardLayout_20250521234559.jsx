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


// import { NavLink, Outlet } from 'react-router-dom';

// const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="md:w-64 w-full bg-gray-100 border-r px-6 py-6 md:h-auto">
//         <nav className="space-y-4">
//           <NavLink
//             to="listings"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded font-medium ${
//                 isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
//               }`
//             }
//           >
//             My Listings
//           </NavLink>
//           <NavLink
//             to="add"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded font-medium ${
//                 isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
//               }`
//             }
//           >
//             Add Car
//           </NavLink>
//           <NavLink
//             to="settings"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded font-medium ${
//                 isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
//               }`
//             }
//           >
//             Settings
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Content */}
//       <main className="flex-1 p-6 bg-white overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;



import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, List } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-gray-900 text-white px-4 py-4 flex items-center justify-between md:hidden">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`md:w-64 w-full bg-gray-100 border-r px-6 py-6 md:block ${
          isSidebarOpen ? 'block' : 'hidden'
        } md:h-auto`}
      >
        <nav className="space-y-4 mt-6 md:mt-10">
          <NavLink
            to="listings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-medium transition ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
              }`
            }
          >
            <List className="w-5 h-5" />
            My Listings
          </NavLink>

          <NavLink
            to="add"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-medium transition ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
              }`
            }
          >
            <PlusCircle className="w-5 h-5" />
            Add Car
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-medium transition ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-800'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
