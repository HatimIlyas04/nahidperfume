import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },

  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Extract bare package name — works on all OSes (Rollup always uses forward slashes)
          const mod = id.split('node_modules/').pop().split('/')[0];
          if (['react', 'react-dom', 'react-router-dom', 'react-router'].includes(mod)) return 'vendor';
          if (['chart.js', 'react-chartjs-2'].includes(mod)) return 'charts';
          if (['xlsx', 'file-saver'].includes(mod)) return 'excel';
          if (mod === 'sweetalert2') return 'ui';
          if (mod === 'axios') return 'axios';
          if (mod === 'react-icons') return 'icons';
        },
      }
    }
  }
})
