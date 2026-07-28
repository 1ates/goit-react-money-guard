import { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon.jsx";
import css from "./CategoryDropdown.module.css";

export default function CategoryDropdown({ value, onChange, options, placeholder = "Select a category", error }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };

    const onEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };
  return (
    <div ref={ref} className={[css.dropdown, isOpen && css.open, error && css.error].filter(Boolean).join(" ")}>
      <button
        type='button'
        className={css.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className={selected ? css.value : css.placeholder}>{selected ? selected.label : placeholder}</span>

        <Icon
          name='chevron-down'
          width={16}
          height={16}
          className={[css.chevron, isOpen && css["chevron-up"]].filter(Boolean).join(" ")}
        />
      </button>

      {isOpen && (
        <ul className={css.list} role='listbox'>
          {options.map((opt) => (
            <li
              key={opt.value}
              role='option'
              aria-selected={opt.value === value}
              className={[css.option, opt.value === value && css["option-active"]].filter(Boolean).join(" ")}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
