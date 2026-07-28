import css from "./DashboardWelcomePage.module.css";

export default function DashboardWelcomePage() {
  return (
    <section className={css.dashboard}>
      <p className={css.eyebrow}>You have no transactions yet.</p>
      <h2 className={css.title}>Add your first transaction</h2>
      <p className={css.description}>Press the + button to record an income or expense.</p>
    </section>
  );
}
