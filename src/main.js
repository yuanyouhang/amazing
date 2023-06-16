import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const pinia = createPinia()
createApp(App)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(pinia)
  .mount('#app')
