import { useCallback, useRef } from "react";

import { useFileStore } from "../../stories";
import { AnalystDragAndDropUI } from "../ui";

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

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, [setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  }, [processFiles, setIsDragging]);

  return (
    <AnalystDragAndDropUI
      fileName={fileName}
      isDragging={isDragging}
      onButtonClick={handleButtonClick}
      onFileChange={handleFileChange}
      onDrag={handleDrag}
      onDrop={handleDrop}
      onReset={reset}
      inputRef={fileInputRef}
    />
  );
};
