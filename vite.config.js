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
            if (
              id.includes('chakra') ||
              id.includes('emotion') ||
              id.includes('framer-motion') ||
              id.includes('motion-')
            ) {
              name = 'chakra';
            } else if (id.includes('highlight')) {
              name = 'highlight';
            } else if (id.includes('chart')) {
              name = 'chart';
            } else if (id.includes('moment')) {
              name = 'moment';
            } else if (id.includes('supabase')) {
              name = 'supabase';
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
