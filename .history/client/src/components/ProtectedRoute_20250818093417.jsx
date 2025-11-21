
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // Nicht eingeloggt → Weiterleiten zu /admin-login oder /login
  if (!user) {
    return <Navigate to={adminOnly ? '/admin-login' : '/login'} replace />;
  }

  // Eingeloggt, aber kein Admin → Weiterleiten zur Startseite
  if (adminOnly && !(user.isAdmin || user.is_admin)) {
    return <Navigate to="/" replace />;
  }

  // Zugriff erlaubt
  return children;
};

export default ProtectedRoute;
