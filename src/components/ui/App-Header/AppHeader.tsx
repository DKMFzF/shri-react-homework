import { useLocation } from "react-router-dom";
import { AppHeaderNavLinkUI } from "../";
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
          <AppHeaderNavLinkUI
            url="/"
            pathImg="./analyst-icon.svg"
            altImg="загрзука"
            text="CSV Аналитик"
            isActive={location.pathname == "/"}
          />

          <AppHeaderNavLinkUI
            url="/generator"
            pathImg="./generator-icon.svg"
            altImg="генератор"
            text="CSV Генератор"
            isActive={location.pathname == "/generator"}
          />

          <AppHeaderNavLinkUI
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
