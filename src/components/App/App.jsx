import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import { selectToken } from "../../store/auth/authSelectors.js";
import { refreshUser } from "../../store/auth/authOperations.js";
import AppRoutes from "../../routes/AppRoutes.jsx";
import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <div className={css.shell}>
      <Loader />
      <AppRoutes />
    </div>
  );
}
