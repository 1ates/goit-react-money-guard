import Currency from "../../components/Currency/Currency.jsx";
import css from "./CurrencyPage.module.css";

export default function CurrencyPage() {
  return (
    <section className={css.currency}>
      <Currency />
    </section>
  );
}
