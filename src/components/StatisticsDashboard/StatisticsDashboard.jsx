import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../../store/statistics/statisticsOperations.js";
import { selectIsLoggedIn, selectIsRefreshing } from "../../store/auth/authSelectors.js";
import { setSelectedMonth, setSelectedYear } from "../../store/statistics/statisticsSlice.js";
import { selectStatisticsMonth, selectStatisticsYear } from "../../store/statistics/statisticsSelectors.js";
import Icon from "../Icon/Icon.jsx";
import css from "./StatisticsDashboard.module.css";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function StatisticsDashboard() {
  const dispatch = useDispatch();
  const month = useSelector(selectStatisticsMonth);
  const year = useSelector(selectStatisticsYear);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(fetchStatistics({ month, year }));
    }
  }, [dispatch, month, year, isLoggedIn, isRefreshing]);

  const handleMonthChange = (e) => dispatch(setSelectedMonth(Number(e.target.value)));
  const handleYearChange = (e) => dispatch(setSelectedYear(Number(e.target.value)));

  return (
    <section className={css.dashboard}>
      <div className={css["select-wrapper"]}>
        <select className={css.select} value={month} onChange={handleMonthChange} aria-label='Select month'>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <Icon name='chevron-down' className={css.icon} width={16} height={16} />
      </div>

      <div className={css["select-wrapper"]}>
        <select className={css.select} value={year} onChange={handleYearChange} aria-label='Select year'>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <Icon name='chevron-down' className={css.icon} width={16} height={16} />
      </div>
    </section>
  );
}
