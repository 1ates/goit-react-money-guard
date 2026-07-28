import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddTransactionModalOpen } from "../../store/global/globalSelectors.js";
import { closeAddTransactionModal } from "../../store/global/globalSlice.js";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx";
import Icon from "../Icon/Icon.jsx";
import css from "./ModalAddTransaction.module.css";

export default function ModalAddTransaction() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddTransactionModalOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closeAddTransactionModal());
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className={css.modal}
      role='dialog'
      aria-modal='true'
      aria-label='Add transaction'
      onClick={() => dispatch(closeAddTransactionModal())}
    >
      <div className={css.card} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.close}
          type='button'
          aria-label='Close modal'
          onClick={() => dispatch(closeAddTransactionModal())}
        >
          <Icon name='close' width={20} height={20} />
        </button>
        <AddTransactionForm />
      </div>
    </div>
  );
}
