import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'

import './assets/styles/variables.css'
import './assets/styles/reset.css'
import './assets/styles/global.css'
import './assets/styles/animations.css'

const app = createApp(App)

app.directive('reveal', reveal)
app.use(router)
app.mount('#app')

// 移除 index.html 里的首屏加载占位
document.getElementById('app-loading')?.remove()
