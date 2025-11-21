
// import { Outlet, Link } from 'react-router-dom';

// const index= () => (
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

// export default index;


import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import MyListings from '../../components/Dashboard/MyListings';
import AddCar from '../../components/Dashboard/AddCar';
import Settings from '../../components/Dashboard/Settings';

const Dashboard = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route path="listings" element={<MyListings />} />
      <Route path="add" element={<AddCar />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
);

export default Dashboard;
