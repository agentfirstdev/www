import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/stats.html', open: true, gzipSize: true, brotliSize: true })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          let name;

          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              name = 'react';
            } else if (id.includes('highlight')) {
              name = 'highlight';
            } else {
              name = 'vendor';
            }

            return name;
          }
        }
      }
    }
  }
});
