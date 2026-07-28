import { iconSpritePath } from "../../constants/assets.js";

export default function Icon({ name, className = "", width = 24, height = 24 }) {
  return (
    <svg className={className} width={width} height={height} aria-hidden='true'>
      <use href={`${iconSpritePath}#icon-${name}`} />
    </svg>
  );
}
