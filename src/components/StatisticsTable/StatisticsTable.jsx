import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatters.js";
import {
  selectExpenseSummary,
  selectIncomeSummary,
  selectStatistics,
} from "../../store/statistics/statisticsSelectors.js";
import css from "./StatisticsTable.module.css";

const PALETTE = [
  "#FED057",
  "#FFD8D0",
  "#FD9498",
  "#C5BAFF",
  "#6E78E8",
  "#4A56E2",
  "#81E1FF",
  "#24CCA7",
  "#00AD84",
  "#FFC727",
];

export default function StatisticsTable() {
  const categories = useSelector(selectStatistics);
  const incomeSummary = useSelector(selectIncomeSummary);
  const expenseSummary = useSelector(selectExpenseSummary);

  const expenses = categories.filter((c) => c.type !== "INCOME");

  if (expenses.length === 0) {
    return (
      <section className={css.statistics}>
        <p className={css["empty-table"]}>No data for this period.</p>
      </section>
    );
  }

  return (
    <section className={css.statistics}>
      <div className={css.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      <ul className={css.list}>
        {expenses.map((cat, i) => (
          <li key={cat.name} className={css.row}>
            <span
              className={css.color}
              style={{ background: cat.color ?? PALETTE[i % PALETTE.length] }}
              aria-hidden='true'
            />
            <span className={css.name}>{cat.name}</span>
            <span className={css.total}>{formatCurrency(Math.abs(cat.total))}</span>
          </li>
        ))}
      </ul>

      <div className={css.totals}>
        <div className={[css["total-row"], css["total-row-expense"]].join(" ")}>
          <span>Expenses:</span>
          <span>{formatCurrency(Math.abs(expenseSummary))}</span>
        </div>
        <div className={[css["total-row"], css["total-row-income"]].join(" ")}>
          <span>Income:</span>
          <span>{formatCurrency(incomeSummary)}</span>
        </div>
      </div>
    </section>
  );
}
