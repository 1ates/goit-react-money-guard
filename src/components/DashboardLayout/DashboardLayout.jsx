import { Outlet } from "react-router-dom";
import Balance from "../Balance/Balance.jsx";
import Currency from "../Currency/Currency.jsx";
import Header from "../Header/Header.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  return (
    <div className={css.layout}>
      <Header />
      <div className={css.container}>
        <aside className={css.sidebar}>
          <Navigation />
          <Balance />
          <div className={css.currency}>
            <Currency />
          </div>
        </aside>
        <main className={css.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
