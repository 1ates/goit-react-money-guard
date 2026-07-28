import { useSelector } from "react-redux";
import { selectTotalBalance } from "../../store/finance/financeSelectors.js";
import css from "./Balance.module.css";

export default function Balance() {
  const totalBalance = useSelector(selectTotalBalance);

  const formattedBalance = Number(totalBalance ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className={css.balance}>
      <p className={css.label}>Your balance</p>
      <p className={css.value}>$ {formattedBalance}</p>
    </section>
  );
}
