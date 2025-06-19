import { Button, ButtonUpload } from "../";
import styles from "./AnalystDragAndDrop.module.css";

export const AnalystDragAndDrop = () => {
  return (
    <div className={styles["analyst-drag-and-drop"]}>
      <span className={styles["analyst-drag-and-drop__description-text"]}>
        Загрузите{" "}
        <span className={styles["analyst-drag-and-drop__bold-text"]}>csv</span>{" "}
        файл и получите{" "}
        <span className={styles["analyst-drag-and-drop__bold-text"]}>
          полную информацию
        </span>{" "}
        о нём за сверхнизкое время
      </span>
      <div className={styles["analyst-drag-and-drop__container"]}>
        <ButtonUpload>Загрузить файл</ButtonUpload>
        <span>или перетащите сюда</span>
      </div>
      <Button type="send" isActive>
        Отправить
      </Button>
    </div>
  );
};
