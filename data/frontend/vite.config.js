import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      src: path.resolve('./src/'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      input: ['index.html', 'src/main.jsx'],

      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img'
          }
          return `${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: 'bundle.js',
        manualChunks: () => 'bundle.js',
      },
    },
    outDir: './dist',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      include: ['src/**'],
    },
    setupFiles: './src/test_setup.js',
  },
})
