import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;