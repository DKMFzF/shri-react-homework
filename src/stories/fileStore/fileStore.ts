import { create } from 'zustand';

import { type FileState } from './type';

export const useFileStore = create<FileState>((set) => ({
  fileName: null,
  isDragging: false,
  isUploaded: false,
  setFileName: (fileName) => set({ fileName }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setIsUploaded: (isUploaded) => set({ isUploaded }),
  processFiles: (files) => {
    const file = files[0];
    set({ fileName: file.name, isUploaded: true });
    console.log("Загружен файл:", file);
  },
  reset: () => set({ fileName: null, isDragging: false, isUploaded: false })
}));
