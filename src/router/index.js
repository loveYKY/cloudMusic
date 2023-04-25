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
  },
  {
    path: '/albumSong',
    component: () => import('../views/albumSong/index.vue')
  },
  {
    path: '/digitDetail',
    component: () => import('../views/DigitDetail/index.vue')
  },
  {
    path: '/comment',
    component: () => import('@/components/comment/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
