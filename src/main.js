import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import options from './server'
//import proxy from 'http-proxy-middleware'

import './assets/main.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
//app.use('/api', proxy(options))

app.mount('#app')
