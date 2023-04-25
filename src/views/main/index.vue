<template>
  <div class="main-container">
    <MainHeader class="mainHeader"></MainHeader>
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      success-text="刷新成功"
      :disabled="refreshDisabled"
    >
      <div class="block-list">
        <div>
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
    const headerHeight = ref(32)
    const visible = ref(false)

    const refreshDisabled = ref(true)
    const scrollTop = ref(0)

    onMounted(() => {
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

    const loading = ref(false)
    const onRefresh = () => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    //游客登陆
    const getAnonimousCookie = async () => {
      let res = null
      if (Cookie.get('cookie')) {
        res = await fetch(
          'https://netease-cloud-music-api-iota-five.vercel.app/login/refresh'
        )
      } else {
        res = await fetch(
          'https://netease-cloud-music-api-iota-five.vercel.app/register/anonimous'
        )
      }
      res.json().then(data => {
        if (data.code == 200) {
          Cookie.set('cookie', data.cookie)
        }
      })
    }
    getAnonimousCookie()

    //向子组件注入刷新事件变量loading
    provide('refresh', loading)

    return {
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
    height: 100vh;
    background-color: rgb(245 242 242);
    &::-webkit-scrollbar {
      display: none;
    }
    & > div {
      margin-bottom: 2.6667rem;
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
}
</style>
