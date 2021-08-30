import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/styles/app.scss'
import App from './App.vue'
import router from "./router"
import store from "./store"
const app = createApp(App)
import moment from 'moment';

app.config.globalProperties.$moment = moment;

app.config.devtools = true;

app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
