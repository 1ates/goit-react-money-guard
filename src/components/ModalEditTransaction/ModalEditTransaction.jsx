import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingTransaction, selectIsEditTransactionModalOpen } from "../../store/global/globalSelectors.js";
import { closeEditTransactionModal } from "../../store/global/globalSlice.js";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm.jsx";
import Icon from "../Icon/Icon.jsx";
import "./ModalEditTransaction.module.css";

export default function ModalEditTransaction() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsEditTransactionModalOpen);
  const transaction = useSelector(selectEditingTransaction);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closeEditTransactionModal());
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, dispatch]);

  if (!isOpen || !transaction) return null;

  return (
    <div
      className='modal'
      role='dialog'
      aria-modal='true'
      aria-label='Edit transaction'
      onClick={() => dispatch(closeEditTransactionModal())}
    >
      <div className='card' onClick={(e) => e.stopPropagation()}>
        <button
          className='close'
          type='button'
          aria-label='Close modal'
          onClick={() => dispatch(closeEditTransactionModal())}
        >
          <Icon name='close' width={20} height={20} />
        </button>
        <EditTransactionForm transaction={transaction} />
      </div>
    </div>
  );
}
