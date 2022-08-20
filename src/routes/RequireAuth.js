import { useAuth } from "app/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isLogged) 
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
