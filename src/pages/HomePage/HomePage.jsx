import { useSelector } from "react-redux";
import ButtonAddTransaction from "../../components/ButtonAddTransaction/ButtonAddTransaction.jsx";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction.jsx";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction.jsx";
import TransactionsList from "../../components/TransactionsList/TransactionsList.jsx";
import { selectTransactions } from "../../store/finance/financeSelectors.js";
import DashboardWelcome from "../DashboardWelcomePage/DashboardWelcomePage.jsx";
import css from "./HomePage.module.css";

export default function HomePage() {
  const transactions = useSelector(selectTransactions);
  const hasTransactions = transactions.length > 0;

  return (
    <section className={css.home}>
      <div className={css.content}>{hasTransactions ? <TransactionsList /> : <DashboardWelcome />}</div>
      <ButtonAddTransaction />
      <ModalAddTransaction />
      <ModalEditTransaction />
    </section>
  );
}
