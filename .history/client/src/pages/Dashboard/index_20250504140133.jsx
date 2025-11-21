

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
