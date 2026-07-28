import { useDispatch } from "react-redux";
import { openAddTransactionModal } from "../../store/global/globalSlice.js";
import Icon from "../Icon/Icon.jsx";
import css from "./ButtonAddTransaction.module.css";

export default function ButtonAddTransaction() {
  const dispatch = useDispatch();

  return (
    <button
      className={css["add-btn"]}
      type='button'
      aria-label='Add transaction'
      onClick={() => dispatch(openAddTransactionModal())}
    >
      <Icon name='plus' width={24} height={24} />
    </button>
  );
}
