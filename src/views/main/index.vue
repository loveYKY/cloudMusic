<template>
  <div class="main-container">
    <MainHeader class="mainHeader"></MainHeader>
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      success-text="刷新成功"
      :disabled="refreshDisabled"
    >
      <div class="block-list" :style="{ height: blockListHeight }">
        <div style="minheight: 800px">
          <div class="block-one">
            <Swiper></Swiper>
            <RecommendSongList></RecommendSongList>
          </div>
          <div class="block-two">
            <AlbumList></AlbumList>
          </div>
          <div class="block-three">
            <RankingList></RankingList>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, provide, watch } from 'vue'
import MainHeader from './components/mainHeader.vue'
import Swiper from './components/swiper.vue'
import RecommendSongList from './components/recommendSongList.vue'
import RankingList from './components/rankingList.vue'
import AlbumList from './components/albumList.vue'
import Api from '@/api'
import Cookie from 'js-cookie'
export default defineComponent({
  components: {
    MainHeader,
    Swiper,
    RecommendSongList,
    RankingList,
    AlbumList
  },
  setup() {
    const clientHeight = ref(0)
    const headerHeight = ref(32)
    const visible = ref(false)

    const refreshDisabled = ref(true)
    const scrollTop = ref(0)

    onMounted(() => {
      clientHeight.value = document.querySelector('body').clientHeight

      document.querySelector('.block-list').addEventListener(
        'scroll',
        e => {
          scrollTop.value = e.target.scrollTop
        },
        false
      )
    })

    watch(scrollTop, cur => {
      if (cur == 0) {
        refreshDisabled.value = false
      } else {
        refreshDisabled.value = true
      }
    })
    const blockListHeight = computed({
      get: function () {
        return clientHeight.value - headerHeight.value - 40 + 'px'
      }
    })
    window.addEventListener(
      'resize',
      () => {
        clientHeight.value = document.querySelector('body').clientHeight
      },
      false
    )

    const loading = ref(false)
    const onRefresh = () => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    //游客登陆
    const getAnonimousCookie = async () => {
      if (Cookie.get('cookie')) return
      let res = await Api.getAnonimousCookie()

      if (res.code == 200) {
        Cookie.set('cookie', res.cookie)
      }
    }
    getAnonimousCookie()

    //向子组件注入刷新事件变量loading
    provide('refresh', loading)

    return {
      blockListHeight,
      refreshDisabled,
      loading,
      visible,
      onRefresh
    }
  }
})
</script>

<style lang="scss" scoped>
.main-container {
  .block-list {
    overflow: auto;
    background-color: rgb(245 242 242);
    &::-webkit-scrollbar {
      display: none;
    }
    .block-one {
      padding: 0 0.3rem;
      background-color: #fff;
      border-radius: 0px 0px 12px 12px;
    }
    .block-two {
      margin-top: 0.16rem;
      padding: 0 0.3rem;
      background-color: #fff;
      border-radius: 12px;
    }
    .block-three {
      margin-top: 0.16rem;
      padding: 0 0.3rem;
      background-color: #fff;
      border-radius: 12px;
      margin-bottom: 0.32rem;
    }
  }
}
</style>
