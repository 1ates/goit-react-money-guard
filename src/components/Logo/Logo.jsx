import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import useAuth from "../../hooks/useAuth.js";
import Icon from "../Icon/Icon.jsx";
import css from "./Logo.module.css";

export default function Logo({ vertical = false }) {
  const { isLoggedIn } = useAuth();
  const targetPath = isLoggedIn ? `${ROUTES.DASHBOARD}${ROUTES.HOME}` : ROUTES.LOGIN;

  return (
    <Link className={[css.logo, vertical && css.vertical].filter(Boolean).join(" ")} to={targetPath}>
      <Icon className={css.icon} name='logo' width={28} height={34} />
      <span className={css.text}>Money Guard</span>
    </Link>
  );
}
