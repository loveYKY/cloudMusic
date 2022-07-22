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
    path:'/albumSquare',
    component: ()=> import('../views/albumSquare/index.vue')
  },
  {
    path:'/albumSong',
    component: ()=> import('../views/albumSong/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
