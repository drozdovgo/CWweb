// Точка входа: создаём Vue-приложение, подключаем роутер и вставляем всё в <div id="app"> из index.html
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import './styles.css'

createApp(App).use(router).mount('#app')
