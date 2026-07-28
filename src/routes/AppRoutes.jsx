import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import PublicRoute from "./PublicRoute.jsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DashboardPage from "../pages/DashboardPage/DashboardPage.jsx";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout.jsx";
import HomeTab from "../pages/HomePage/HomePage.jsx";
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage.jsx";
import CurrencyPage from "../pages/CurrencyPage/CurrencyPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<HomeTab />} />
          <Route path={ROUTES.HOME.slice(1)} element={<HomeTab />} />
          <Route path={ROUTES.STATISTICS.slice(1)} element={<StatisticsPage />} />
          <Route path={ROUTES.CURRENCY.slice(1)} element={<CurrencyPage />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRoutes;
