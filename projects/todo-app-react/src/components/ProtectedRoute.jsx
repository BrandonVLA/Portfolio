import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  //read if user is authenticated on redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
