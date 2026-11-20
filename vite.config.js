// Настройки Vite — программы, которая запускает сайт командой npm run dev
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], // учим Vite понимать файлы .vue
  server: {
    host: '127.0.0.1', // адрес сайта: http://127.0.0.1:5173 (так он точно открывается в любом браузере)
    open: true, // после запуска сразу открыть сайт в браузере
  },
})
