import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute Debug:', {
    user,
    userType: user?.type,
    allowedRoles,
    hasRequiredRole: allowedRoles?.includes(user?.type)
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('No user - redirecting to login');
    return <Navigate to="/login-ngo" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    console.log('User type not allowed - current type:', user.type);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;