import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
createApp(App).use(store).use(router).directive('demo', (el,binding) => {
    el.style.color = 'red'
    console.log(binding.value)
}).mount('#app')


