import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir:'../../www/Frame/JS/App/',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'App',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue', g: 'g',  },
      },
    },
  },
})
