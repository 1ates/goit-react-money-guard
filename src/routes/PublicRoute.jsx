import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import useAuth from "../hooks/useAuth.js";

export default function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return children;
}
