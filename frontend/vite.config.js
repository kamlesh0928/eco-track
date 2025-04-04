import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build', // Ensure this matches your expected publish directory
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about /*#__PURE__*/ comments
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT' || warning.message.includes('/*#__PURE__*/')) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          // Split vendor dependencies into separate chunks
          vendor: ['react', 'react-dom', 'next-themes'],
          recharts: ['recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (optional)
  },
 
});
