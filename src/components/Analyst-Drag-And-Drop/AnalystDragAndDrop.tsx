import { useFileStore } from "../../stories";
import { AnalystDragAndDropUI } from "../ui";
import { useDragAndDrop } from "../../hooks";

export const AnalystDragAndDrop = () => {
  const { fileName, isDragging, setIsDragging, processFiles, reset } =
    useFileStore();

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

  return (
    <AnalystDragAndDropUI
      fileName={fileName}
      isDragging={isDragging}
      onButtonClick={onButtonClick}
      onFileChange={onFileChange}
      onDrag={onDrag}
      onDrop={onDrop}
      onReset={reset}
      inputRef={fileInputRef}
    />
  );
};
