import { create } from 'zustand';

import { type FileState } from './type';

export const useFileStore = create<FileState>((set) => ({
  fileName: null,
  file: null,
  isDragging: false,
  isUploaded: false,
  setFileName: (fileName) => set({ fileName }),
  setFile: (file) => set({ file }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setIsUploaded: (isUploaded) => set({ isUploaded }),
  processFiles: (files) => {
    const file = files[0];
    set({ 
      fileName: file.name, 
      file: file,
      isUploaded: true 
    });
    console.log("Загружен файл:", file);
  },
  reset: () => set({ 
    fileName: null, 
    file: null,
    isDragging: false, 
    isUploaded: false 
  })
}));
