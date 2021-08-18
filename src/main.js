import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css'
import router from "./router"
import store from "./store"
const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
