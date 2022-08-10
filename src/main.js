import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// locale.use(lang)


createApp(App)
.use(store)
.use(router)
.use(ElementPlus)

.mount('#app');



