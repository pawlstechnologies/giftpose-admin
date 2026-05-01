

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All /api requests → forwarded to localhost:4000/api
      // Browser only talks to localhost:5173 — no CORS issue
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});



