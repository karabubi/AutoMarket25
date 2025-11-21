
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import CarDetailsPublic from './pages/CarDetailsPublic';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/index';
import AdminDashboard from './pages/AdminDashboard';
import AdminReport from './pages/AdminReport';
import PaymentReport from './pages/PaymentReport'; // ✅ New import
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Cars from './pages/Cars';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import AdminLogin from './pages/AdminLogin';
import { Toaster } from 'react-hot-toast';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/car-public/:id" element={<CarDetailsPublic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected User Dashboard */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin-Only Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/report"
              element={
                <ProtectedRoute adminOnly>
                  <AdminReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/PaymentReport"
              element={
                <ProtectedRoute adminOnly>
                  <PaymentReport />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
