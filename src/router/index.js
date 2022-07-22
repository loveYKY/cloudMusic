import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../views/main/index.vue')
  },
  {
    path: '/songList',
    component: () => import('../views/songList/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
