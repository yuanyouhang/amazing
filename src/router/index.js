import { createRouter, createWebHashHistory } from 'vue-router'
import DemoEntry from '../components/DemoEntry.vue'

const routes = [
  {
    path: '/',
    component: DemoEntry
  },
  {
    path: '/CanvasDemo',
    name: 'CanvasDemo',
    component: () => import('@/views/CanvasDemo.vue')
  },
  {
    path: '/AudioDemo',
    name: 'AudioDemo',
    component: () => import('@/views/AudioDemo.vue')
  },
]

const router = createRouter({
  // 使用 hash 模式
  history: createWebHashHistory(),
  routes,
})

export default router