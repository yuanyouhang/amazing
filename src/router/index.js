import { createRouter, createWebHashHistory } from 'vue-router'
import DemoEntry from '../components/DemoEntry.vue'
import NotFound from '@/views/NotFound.vue'
const routes = [
  {
    path: '/',
    component: DemoEntry
  },
  {
    path: '/Canvas',
    name: 'Canvas',
    component: () => import('@/views/CanvasDemo.vue')
  },
  {
    path: '/Audio',
    name: 'Audio',
    component: () => import('@/views/AudioDemo.vue')
  },
  {
    path: '/News',
    name: 'News',
    component: () => import('@/views/News.vue')
  },
  {
    path: '/Articles',
    name: 'Articles',
    component: () => import('@/views/Articles.vue')
  },
  {
    path: '/Video',
    name: 'Video',
    component: () => import('@/views/Video.vue')
  },
  {
    path: '/Sort',
    name: 'Sort',
    component: () => import('@/views/Sort.vue')
  },
  {
    path: '/More',
    name: 'More',
    component: () => import('@/views/More.vue')
  },
  {
    path: '/Physics',
    name: 'Physics',
    component: () => import('@/views/Physics.vue'),
    children: [
      {
        path: '',
        redirect: '/Physics/PhysicsHome'
      },
      {
        path: 'PhysicsHome',
        name: 'PhysicsHome',
        component: () => import('@/views/Physics/PhysicsHome.vue')
      },
      {
        path: 'Physicists',
        name: 'Physicists',
        component: () => import('@/views/Physics/Physicists.vue')
      },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  // 使用 hash 模式
  history: createWebHashHistory(),
  routes,
})

export default router