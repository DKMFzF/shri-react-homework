import { useLocation } from "react-router-dom";
import { AppHeaderNavLink } from "../";
import styles from "./AppHeader.module.css";

export const HeaderUI = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.header__row}>
        <div className={styles["header__meta-info"]}>
          <img
            className={styles.header__logo}
            src="./logo-icon.svg"
            alt="летних школ"
            loading="lazy"
            decoding="async"
          />
          <span
            className={`${styles.header__text} ${styles["header__short-description"]}`}
          >
            Межгалактическая аналитика
          </span>
        </div>

        <nav className={styles["header__top-menu"]}>
          <AppHeaderNavLink
            url="/"
            pathImg="./analyst-icon.svg"
            altImg="загрзука"
            text="CSV Аналитик"
            isActive={location.pathname == "/"}
          />

          <AppHeaderNavLink
            url="/generator"
            pathImg="./generator-icon.svg"
            altImg="генератор"
            text="CSV Генератор"
            isActive={location.pathname == "/generator"}
          />

          <AppHeaderNavLink
            url="/history"
            pathImg="./history-icon.svg"
            altImg="история"
            text="История"
            isActive={location.pathname == "/history"}
          />
        </nav>
      </div>
    </header>
  );
};
