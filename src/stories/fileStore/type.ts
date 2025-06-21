export interface FileState {
  fileName: string | null;
  file: File | null; // Добавляем поле для хранения самого файла
  isDragging: boolean;
  isUploaded: boolean;
  setFileName: (name: string | null) => void;
  setFile: (file: File | null) => void; // Добавляем метод для установки файла
  setIsDragging: (dragging: boolean) => void;
  setIsUploaded: (uploaded: boolean) => void;
  processFiles: (files: FileList) => void;
  reset: () => void;
}
