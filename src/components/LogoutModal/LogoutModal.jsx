import { createPortal } from "react-dom";
import Logo from "../Logo/Logo.jsx";
import css from "./LogoutModal.module.css";

export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return createPortal(
    <div className={css.modal} role='dialog' aria-modal='true' aria-label='Logout confirmation' onClick={onCancel}>
      <div className={css.card} onClick={(e) => e.stopPropagation()}>
        <div className={css["logo-container"]}>
          <Logo />
        </div>
        <p className={css.message}>Are you sure you want to log out?</p>
        <div className={css.actions}>
          <button className={css.confirm} type='button' onClick={onConfirm}>
            LOGOUT
          </button>
          <button className={css.cancel} type='button' onClick={onCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
