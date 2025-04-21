import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect based on the route type
    const loginRoute = location.pathname.startsWith('/ngo') ? '/login-ngo' : '/login-individual';
    return <Navigate to={loginRoute} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;