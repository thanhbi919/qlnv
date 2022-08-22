import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import jp from "@/config/jp";

createApp(App)
.use(store)
.use(router)
.use(ElementPlus,{locale: jp})
    .mount('#app');



