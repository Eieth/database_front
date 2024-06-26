import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import App from './App.vue'
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus).use(router).use(pinia)
app.mount('#app')