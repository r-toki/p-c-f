import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
    },
  },
  // SEE: https://github.com/vitejs/vite/discussions/8640#discussioncomment-2974191
  esbuild: {
    define: {
      this: 'window',
    },
  },
});
