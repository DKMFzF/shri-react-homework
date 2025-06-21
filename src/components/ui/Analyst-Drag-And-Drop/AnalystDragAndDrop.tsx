import { useCallback, useRef } from "react";

import { useFileStore } from "../../../stories";
import { ButtonUpload, StatusContent } from "../";
import styles from "./AnalystDragAndDrop.module.css";

export const AnalystDragAndDrop = () => {
  const {
    fileName,
    isDragging,
    setIsDragging,
    processFiles,
    reset
  } = useFileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) processFiles(files);
  }, [processFiles]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, [setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  }, [processFiles, setIsDragging]);

  return (
    <div
      className={`${styles['analyst-drag-and-drop__container']} ${
        isDragging
          ? styles['analyst-drag-and-drop__container_dragging']
          : ""}`
      }
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles['analyst-drag-and-drop__file-input']}
        accept=".csv"
      />
      {fileName ? (
        <div className={styles.fileName}>
          <StatusContent
            status="done"
            statusText={fileName}
            descriptionText="файл загружен"
            onDelete={reset}
          />
        </div>
      ) : (
        <>
          <ButtonUpload onClick={handleButtonClick}>Загрузить файл</ButtonUpload>
          <span>или перетащите сюда</span>
        </>
      )}
    </div>
  );
};
