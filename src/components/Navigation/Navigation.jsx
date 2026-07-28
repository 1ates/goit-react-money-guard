import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import Icon from "../Icon/Icon.jsx";
import css from "./Navigation.module.css";

const buildNavClassName = ({ isActive }) => [css.link, isActive && css["link-active"]].filter(Boolean).join(" ");

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.HOME}`}>
        <Icon className={css.navicon} name='home' />
        <span className={css.navspan}>Home</span>
      </NavLink>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.STATISTICS}`}>
        <Icon className={css.navicon} name='statistics' />
        <span className={css.navspan}>Statistics</span>
      </NavLink>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.CURRENCY}`}>
        <Icon className={css.navicon} name='currency' />
        <span className={css.navspan}>Currency</span>
      </NavLink>
    </nav>
  );
}
