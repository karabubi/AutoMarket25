

///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/Dashboard/index.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import MyListings from '../../components/Dashboard/MyListings';
import AddCar from "./AddCar";

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