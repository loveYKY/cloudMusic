import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/scss/global.scss'
import 'default-passive-events'
import 'lib-flexible/flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(Lazyload, {
    lazyComponent: true
  })
  .mount('#app')

