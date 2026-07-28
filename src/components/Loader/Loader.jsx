import { ThreeCircles } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "../../store/auth/authSelectors.js";
import { selectIsLoading } from "../../store/global/globalSelectors.js";
import css from "./Loader.module.css";

export default function Loader() {
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isVisible = isLoading || isRefreshing;

  if (!isVisible) {
    return null;
  }

  return (
    <div className={css.loader} role='status' aria-live='polite' aria-label='Loading'>
      <div className={css.backdrop} />
      <div className={css["spinner-wrap"]}>
        <ThreeCircles
          height={56}
          width={56}
          color='#24CCA7'
          secondaryColor='rgba(255, 255, 255, 0.22)'
          strokeWidth={5}
          strokeWidthSecondary={5}
          visible
          ariaLabel='money-guard-loader'
        />
      </div>
    </div>
  );
}
