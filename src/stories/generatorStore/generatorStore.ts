import { create } from 'zustand';

import { type GeneratorState } from './type';

export const useGeneratorStore = create<GeneratorState>((set) => ({
  isLoading: false,
  error: null,
  downloadUrl: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setDownloadUrl: (downloadUrl) => set({ downloadUrl }),
  reset: () => set({ isLoading: false, error: null, downloadUrl: null }),
}));
