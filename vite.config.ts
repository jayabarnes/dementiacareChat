import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['openai'],
    }
  },
  optimizeDeps: {
    include: ['openai'],
    exclude: ['lucide-react'],
  }
});
