
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const extractString = (url) => {
    const parts = url.split('/');
    return parts.slice(3).join('/');
  };
  const extractedString = extractString(window.location.href.toString());

  return isAuthenticated ? children : <Navigate to={`/login?redirectTo=${extractedString}`} />;
};

export default PrivateRoute;
