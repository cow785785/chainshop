import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store'; // 引入store.js文件

const app = createApp(App)

app.use(router)
app.use(store); // 使用store

app.mount('#app')
