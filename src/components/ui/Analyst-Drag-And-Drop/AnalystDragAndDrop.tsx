import { ButtonUploadUI, StatusContentUI } from "..";
import { type AnalystDragAndDropUIProps } from "./type";
import styles from "./AnalystDragAndDrop.module.css";

export const AnalystDragAndDropUI = ({
  fileName,
  isDragging,
  onButtonClick,
  onFileChange,
  onDrag,
  onDrop,
  onReset,
  inputRef,
}: AnalystDragAndDropUIProps) => (
  <div
    className={`${styles["analyst-drag-and-drop__container"]} ${
      isDragging ? styles["analyst-drag-and-drop__container_dragging"] : ""
    } ${fileName ? styles["analyst-drag-and-drop__container_uploaded"] : ""}`}
    onDragEnter={onDrag}
    onDragOver={onDrag}
    onDragLeave={onDrag}
    onDrop={onDrop}
  >
    <input
      type="file"
      ref={inputRef}
      onChange={onFileChange}
      className={styles["analyst-drag-and-drop__file-input"]}
      accept=".csv"
    />
    {fileName ? (
      <div className={styles.fileName}>
        <StatusContentUI
          statusText={fileName}
          descriptionText="файл загружен"
          onDelete={onReset}
        />
      </div>
    ) : (
      <>
        <ButtonUploadUI onClick={onButtonClick}>Загрузить файл</ButtonUploadUI>
        <span>или перетащите сюда</span>
      </>
    )}
  </div>
);
