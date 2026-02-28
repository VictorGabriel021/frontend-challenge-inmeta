import { createApp } from 'vue'

import { createPinia } from 'pinia'

import router from './router'

import App from './app/App.vue'

import '@/app/index.css'
import 'vue-sonner/style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)
app.mount('#app')
