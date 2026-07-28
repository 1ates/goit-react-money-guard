import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectStatistics } from "../../store/statistics/statisticsSelectors.js";
import css from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const options = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${Number(ctx.parsed).toFixed(2)} UAH`,
      },
    },
  },
};

export default function Chart() {
  const categories = useSelector(selectStatistics);
  const expenseCategories = categories.filter((c) => c.type !== "INCOME");

  if (expenseCategories.length === 0) {
    return (
      <section className='chart empty'>
        <p className='empty-text'>No expense data for this period</p>
      </section>
    );
  }

  const data = {
    labels: expenseCategories.map((c) => c.name),
    datasets: [
      {
        data: expenseCategories.map((c) => Math.abs(c.total)),
        backgroundColor: expenseCategories.map((c, i) => c.color ?? PALETTE[i % PALETTE.length]),
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <section className={css.chart}>
      <div className={css["canvas-wrapper"]}>
        <Doughnut data={data} options={options} />
      </div>
    </section>
  );
}
