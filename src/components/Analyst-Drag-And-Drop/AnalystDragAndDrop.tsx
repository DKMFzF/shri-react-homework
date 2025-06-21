import { useFileStore } from "../../stories";
import { AnalystDragAndDropUI } from "../ui";
import { useDragAndDrop } from "../../hooks";
import { type AnalystDragAndDropProps } from './type';

export const AnalystDragAndDrop = ({ onReset, showErrorStatus, isLoading }: AnalystDragAndDropProps) => {
  const {
    fileName,
    isDragging,
    setIsDragging,
    processFiles
  } = useFileStore();

  const {
    fileInputRef,
    handleButtonClick: onButtonClick,
    handleFileChange: onFileChange,
    handleDrag: onDrag,
    handleDrop: onDrop,
  } = useDragAndDrop({
    onFilesSelected: processFiles,
    onDragStateChange: setIsDragging,
  });

  const handleReset = () => onReset();

  return (
    <AnalystDragAndDropUI
      fileName={fileName}
      isDragging={isDragging}
      onButtonClick={onButtonClick}
      onFileChange={onFileChange}
      onDrag={onDrag}
      onDrop={onDrop}
      onReset={handleReset}
      inputRef={fileInputRef}
      status={showErrorStatus ? "error" : fileName ? "done" : "default"}
      isLoading={isLoading}
    />
  );
};
