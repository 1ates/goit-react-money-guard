import css from "./ProgressBar.module.css";

export default function ProgressBar({ value = 0 }) {
  return (
    <div className={css.bar} aria-hidden='true'>
      <span className={css.value} style={{ width: `${value}%` }} />
    </div>
  );
}
