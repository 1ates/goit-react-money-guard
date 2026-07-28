import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { openEditTransactionModal } from "../../store/global/globalSlice.js";
import { formatCurrency, formatDate } from "../../utils/formatters.js";
import { deleteTransactionThunk } from "../../store/finance/financeOperations.js";
import Icon from "../Icon/Icon.jsx";
import css from "./TransactionsItem.module.css";

export default function TransactionsItem({ id, transactionDate, type, categoryId, comment, amount, categories }) {
  const dispatch = useDispatch();
  const isIncome = type === "INCOME" || type === "+";
  const category = categories?.find((c) => c.id === categoryId)?.name ?? "Other";

  const handleEdit = () => {
    dispatch(openEditTransactionModal({ id, transactionDate, type, categoryId, comment, amount }));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransactionThunk(id)).unwrap();
      toast.success("Transaction deleted");
    } catch (error) {
      toast.error(error || "Could not delete transaction");
    }
  };

  return (
    <article className={[css.transactions, isIncome ? css.income : css.expense].filter(Boolean).join(" ")}>
      <span className={css["color-marker"]} aria-hidden='true' />

      <div className={css.grid}>
        <span className={css.label}>Date</span>
        <span className={css.value}>{formatDate(transactionDate)}</span>

        <span className={css.label}>Type</span>
        <span className={css.value}>{isIncome ? "+" : "-"}</span>

        <span className={css.label}>Category</span>
        <span className={css.value}>{category}</span>

        <span className={css.label}>Comment</span>
        <span className={[css.value, css.comment].join(" ")}>{comment || "—"}</span>

        <span className={css.label}>Sum</span>
        <span
          className={[css.amount, isIncome ? css["amount-income"] : css["amount-expense"]].filter(Boolean).join(" ")}
        >
          {isIncome ? "+" : "-"} {formatCurrency(Math.abs(amount))}
        </span>
      </div>

      <div className={css.actions}>
        <button
          className={[css.btn, css["btn-edit"]].join(" ")}
          type='button'
          aria-label='Edit transaction'
          onClick={handleEdit}
        >
          <Icon name='edit' width={18} height={18} />
        </button>
        <button
          className={[css.btn, css["btn-delete"]].join(" ")}
          type='button'
          aria-label='Delete transaction'
          onClick={handleDelete}
        >
          <Icon name='trash' width={18} height={18} />
        </button>
      </div>
    </article>
  );
}
