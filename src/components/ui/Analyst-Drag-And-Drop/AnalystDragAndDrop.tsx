import { useState, useRef, useCallback } from "react";
import { ButtonUpload } from "../";
import styles from "./AnalystDragAndDrop.module.css";

export const AnalystDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обработчик клика на кнопку (открывает диалог выбора файла)
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Обработчик выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  // Обработчик событий перетаскивания
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  // Обработчик сброса файлов
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, []);

  // Обработка загруженных файлов
  const processFiles = (files: FileList) => {
    console.log("Загружены файлы:", Array.from(files));
    // Здесь можно добавить логику обработки файлов
    // Например, загрузку на сервер или парсинг
  };

  return (
    <div
      className={`${styles["analyst-drag-and-drop__container"]} ${
        isDragging ? styles["analyst-drag-and-drop__container_dragging"] : ""
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles["analyst-drag-and-drop__file-input"]}
      />
      <ButtonUpload onClick={handleButtonClick}>Загрузить файл</ButtonUpload>
      <span>или перетащите сюда</span>
    </div>
  );
};
