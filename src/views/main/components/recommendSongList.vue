<template>
  <div class="lateralLazyLoading-container">
    <header class="title">
      <div>推荐歌单</div>
      <van-button type="default" class="moreBtn" :click="toSongList"
        ><span>更多</span><van-icon name="arrow"
      /></van-button>
    </header>
    <div class="songList" @scroll="getScrollLeft">
      <div
        v-for="(item, index) in songList"
        :key="index"
        class="imageItem"
        @click="goToDetail(item.id)"
      >
        <template v-if="scrollLeft + clientWidth > item.leftBorder">
          <van-image
            width="2.7rem"
            height="2.7rem"
            radius="6px"
            fit="contain"
            lazy-load
            :src="`${item.picUrl}?param=200y200`"
          />
          <div class="desc van-multi-ellipsis--l3">{{ item.name }}</div>
          <div class="playCount">
            <van-icon name="play-circle-o" />
            <span>{{ item.playCount }}万</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, inject, watch } from 'vue'
import Api from '@/api/index.js'
import { useRouter } from 'vue-router'
var _ = require('lodash')
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'recommendSongList',
  setup() {
    const router = useRouter()
    //获取数据
    const songList = ref([])
    const totalList = ref([])
    const startIndex = ref(0)
    let imgWidth = document.querySelector('html').style.fontSize.split('px')[0]

    const getRecommendSongList = async () => {
      let res = await Api.getRecommendSongList({})
      if (res.code == 200) {
        totalList.value = res.result
        songList.value = res.result.slice(0, 6).map((item, index) => {
          return {
            ...item,
            playCount: parseInt(item.playCount / 10000),
            leftBorder: index * imgWidth * 2.91
          }
        })
      }
    }
    getRecommendSongList()

    //懒加载实现
    const clientWidth = ref(0)
    //图片宽度
    onMounted(() => {
      clientWidth.value = document.querySelector(
        '.lateralLazyLoading-container'
      ).clientWidth
    })
    const scrollLeft = ref(0)
    //获取横向滚动条进度
    const fn = e => {
      scrollLeft.value = e.target.scrollLeft
    }
    const getScrollLeft = _.throttle(fn, 100)

    //监听刷新
    const refresh = inject('refresh')
    watch(refresh, () => {
      if (refresh.value == true) {
        startIndex.value++
        if (startIndex.value == 5) startIndex.value = 0
        songList.value = totalList.value
          .slice(startIndex.value * 6, (startIndex.value + 1) * 6)
          .map((item, index) => {
            return {
              ...item,
              playCount: parseInt(item.playCount / 10000),
              leftBorder: index * imgWidth * 2.91
            }
          })
      }
    })

    const toSongList = () => {
      router.push('/songList')
    //跳转至歌单详情页面
    const goToDetail = id => {
      router.push({
        path: '/albumSong',
        query: {
          id: id
        }
      })
    }

    return {
      songList,
      getScrollLeft,
      scrollLeft,
      clientWidth,
      toSongList,

      goToDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.lateralLazyLoading-container {
  height: 5.8667rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.4267rem;
    font-weight: bolder;
    padding: 0.5333rem 0;
    .moreBtn {
      padding: 0 0.16rem 0 0.2rem;
      height: 0.48rem;
      border-radius: 0.48rem;
      font-size: 0.32rem;
      font-weight: normal;
    }
  }
  .songList {
    display: flex;
    overflow-x: auto;
    .imageItem {
      margin-right: 0.2133rem;
      position: relative;
      .playCount {
        background-color: rgba(73, 72, 72, 0.2);
        height: 0.3733rem;
        padding: 0 0.16rem;
        border-radius: 0.2667rem;
        position: absolute;
        right: 0.0533rem;
        top: 0.0533rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
      .desc {
        line-height: 0.3733rem;
        overflow: hidden;
        white-space: pre-wrap;
        transform: scale(0.9);
        letter-spacing: 1px;
      }
    }
    & .imageItem:nth-child(6) {
      margin-right: 0px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    :deep(.van-image__img) {
      animation: appear 0.5s linear;
    }
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
