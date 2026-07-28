import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import useAuth from "../hooks/useAuth.js";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }
  return children;
}
