import { useSelector } from "react-redux";

import { selectCategories, selectTransactions } from "../../store/finance/financeSelectors.js";
import TransactionsItem from "../TransactionsItem/TransactionsItem.jsx";
import css from "./TransactionsList.module.css";

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  return (
    <section className={css.list}>
      <div className={css.header}>
        <span />
        <span>Date</span>
        <span>Type</span>
        <span>Category</span>
        <span className={css.comment}>Comment</span>
        <span>Sum</span>
        <span />
      </div>
      <div className={css.body}>
        {transactions.length === 0 ? (
          <p className={css.empty}>No transactions yet. Add your first transaction!</p>
        ) : (
          transactions.map((t) => <TransactionsItem key={t.id} {...t} categories={categories} />)
        )}
      </div>
    </section>
  );
}
