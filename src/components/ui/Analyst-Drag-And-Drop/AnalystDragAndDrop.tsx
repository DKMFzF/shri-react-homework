import { ButtonUpload } from "../";
import styles from "./AnalystDragAndDrop.module.css";

export const AnalystDragAndDrop = () => {
  return (
    <>
      <div className={styles["analyst-drag-and-drop__container"]}>
        <ButtonUpload>Загрузить файл</ButtonUpload>
        <span>или перетащите сюда</span>
      </div>
    </>
  );
};
