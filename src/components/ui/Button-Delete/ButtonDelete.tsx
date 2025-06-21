import { type ButtonDeleteUIProps } from "./type.ts";
import styles from "./ButtonDelete.module.css";

export const ButtonDeleteUI = ({ onClick }: ButtonDeleteUIProps) => (
  <button className={styles["button-delete"]} onClick={onClick}></button>
);
