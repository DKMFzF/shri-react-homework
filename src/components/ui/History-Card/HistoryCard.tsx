import { ButtonDeleteUI } from "../";

import { type HistoryCardProps } from "./type";
import styles from "./HistoryCard.module.css";

export const HistoryCard = ({
  fileName,
  data,
  status,
  onDelete,
  onClick
}: HistoryCardProps) => {
  return (
    <article className={styles["history-card"]} onClick={onClick}>
      <div className={styles["history-card__info-container"]}>
        <div className={styles["history-card__info-chunck-container"]}>
          <img src="./file-icon.svg" alt="file icon" />
          <span>{fileName}</span>
        </div>

        <div>{data}</div>

        {status === "error" ? (
          <>
            <div
              className={`${styles["history-card__info-chunck-container"]}
              ${styles["history-card__info-chunck-container_no-active"]}`}
            >
              <span>Обработан успешно</span>
              <img src="./smile-icon.svg" alt="smile icon" />
            </div>
            <div className={`${styles["history-card__info-chunck-container"]}`}>
              <span>Не удалось обработать</span>
              <img src="./sadness-icon.svg" alt="sadness icon" />
            </div>
          </>
        ) : (
          <>
            <div className={styles["history-card__info-chunck-container"]}>
              <span>Обработан успешно</span>
              <img src="./smile-icon.svg" alt="smile icon" />
            </div>
            <div
              className={`${styles["history-card__info-chunck-container"]}
              ${styles["history-card__info-chunck-container_no-active"]}`}
            >
              <span>Не удалось обработать</span>
              <img src="./sadness-icon.svg" alt="sadness icon" />
            </div>
          </>
        )}
      </div>
      <ButtonDeleteUI version="trash" onDelete={onDelete} />
    </article>
  );
};
