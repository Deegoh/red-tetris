import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: ['es2020'],
    
    modulePreload: { polyfill: false },
    polyfillModulePreload: true,

    manifest: true,

    commonjsOptions2: {
      transformMixedEsModules: true,
      include: [],
    },

    rollupOptions: {
      input: 'src/main.js',

      external2: [
        '/^node:.*/',
      ],
      
      output2: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: 'main.js',
      },
    },
    // outDir: './dist',

  },

  optimizeDeps2: {
    disabled: false
  },
})