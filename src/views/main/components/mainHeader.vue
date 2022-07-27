<template>
  <div class="container">
    <van-icon name="wap-nav" size="20" @click="showPopup" />
    <ul>
      <li
        v-for="(item, index) in menu"
        :key="index"
        :class="{ active: item.name == activeKey }"
        @click="jump"
        >{{ item.name }}</li
      >
    </ul>
    <van-icon name="search" size="20" />

    <LeftPopupVue v-model:visible="showLeftPopup" teleport="body"></LeftPopupVue>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
import LeftPopupVue from './leftPopup.vue'
export default defineComponent({
  name: 'mainHeader',
  components: {
    LeftPopupVue
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const menu = ref([
      {
        name: '我的',
        path: '/'
      },
      {
        name: '发现',
        path: '/main'
      },
      {
        name: '云村',
        path: '/'
      },
      {
        name: '视频',
        path: '/'
      }
    ])

    const activeKey = ref(null)

    watch(
      route,
      cur => {
        let temp = menu.value.find(item => {
          return item.path == cur.path
        })
        activeKey.value = temp?.name
      },
      {
        deep: true,
        immediate: true
      }
    )

    const jump = () => {
      Toast({
        message: '敬请期待',
        position: 'top'
      })
    }

    const showLeftPopup = ref(false)
    const showPopup = () => {
      showLeftPopup.value = true
    }

    return {
      menu,
      activeKey,
      jump,
      showLeftPopup,
      showPopup
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 0.3rem 0.3rem 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  ul {
    display: flex;
    align-items: center;
    font-size: 0.1042rem;
    li {
      margin-right: 0.3125rem;
    }
    & li:nth-child(4) {
      margin-right: 0rem;
    }
    .active {
      font-weight: bolder;
      font-size: 0.4rem;
    }
  }
}
</style>
