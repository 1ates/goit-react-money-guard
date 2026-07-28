import Chart from "../../components/Chart/Chart.jsx";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard.jsx";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable.jsx";
import css from "./StatisticsPage.module.css";

export default function StatisticsPage() {
  return (
    <section className={css.statistics}>
      <div className={css.dashboard}>
        <StatisticsDashboard />
      </div>
      <Chart />
      <StatisticsTable />
    </section>
  );
}
