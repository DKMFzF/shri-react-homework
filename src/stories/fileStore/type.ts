export interface FileState {
  fileName: string | null;
  isDragging: boolean;
  isUploaded: boolean;
  setFileName: (name: string | null) => void;
  setIsDragging: (dragging: boolean) => void;
  setIsUploaded: (uploaded: boolean) => void;
  processFiles: (files: FileList) => void;
  reset: () => void;
}
