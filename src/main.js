import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus).use(router)
app.mount('#app')