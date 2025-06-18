import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      
      '@services': path.resolve(__dirname, 'src/services'),
      '@stories': path.resolve(__dirname, 'src/stories'),

      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
})
