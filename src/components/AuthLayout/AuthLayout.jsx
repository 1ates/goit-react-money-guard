import css from "./AuthLayout.module.css";

export default function AuthLayout({ children, variant = "login" }) {
  return (
    <section className={[css.layout, css[variant]].filter(Boolean).join(" ")}>
      <div className={css["interactive-layer"]}>{children}</div>
    </section>
  );
}
