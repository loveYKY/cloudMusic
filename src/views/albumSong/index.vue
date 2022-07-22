<template>
  <div
    class="albumSonge-container"
    @scroll="changeHeaderColor"
    @touchend="touchend"
    @touchstart="touchstart"
  >
    <header class="header" :style="{ backgroundColor: color }">
      <div class="header-left">
        <van-icon name="down" class="back" size="24" />
        <span>歌单</span>
      </div>
      <div class="header-right">
        <van-icon name="search" size="24" class="search" />
        <van-icon name="ellipsis" size="24" class="ellipsis" />
      </div>
    </header>

    <div class="content">
      <van-skeleton title :row="3" style="margin-top: 1rem" :loading="loading">
        <div class="cover">
          <div
            class="coverImg"
            :style="{
              backgroundImage: `url(${albumDetail.coverImgUrl}?param=200y200)`
            }"
          >
          </div>
          <div class="detail">
            <van-image
              class="image"
              height="3rem"
              radius="10px"
              :src="`${albumDetail.coverImgUrl}?param=200y200`"
            />
            <div class="desc">
              <p class="name">{{ albumDetail.name }}</p>
              <p class="description">{{
                albumDetail.description.slice(0, 20) + '...'
              }}</p>
            </div>
          </div>
          <div class="buttonList">
            <van-button type="default"
              ><van-icon name="add-o" style="margin-right: 4px" />{{
                albumDetail.subscribedCount > 10000
                  ? (albumDetail.subscribedCount / 10000).toFixed(0) + '万'
                  : albumDetail.subscribedCount
              }}</van-button
            >
            <van-button type="default"
              ><van-icon name="chat-o" style="margin-right: 4px" />{{
                albumDetail.commentCount > 10000
                  ? (albumDetail.commentCount / 10000).toFixed(0) + '万'
                  : albumDetail.commentCount
              }}</van-button
            >
            <van-button type="default"
              ><van-icon name="share-o" style="margin-right: 4px" />{{
                albumDetail.shareCount > 10000
                  ? (albumDetail.shareCount / 10000).toFixed(0) + '万'
                  : albumDetail.shareCount
              }}</van-button
            >
          </div>
        </div>
      </van-skeleton>

      <div class="song-list"> </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/index.js'
var _ = require('lodash')
export default defineComponent({
  setup() {
    const route = useRoute()
    const loading = ref(true)
    const albumId = ref(route.query.id)

    const albumDetail = ref({})
    const songList = ref([])

    //获取歌单详情信息
    const getAlbumDetail = async () => {
      let res = await Api.getAlbumDetail(albumId.value)
      console.log(res)
      if (res.code == 200) {
        albumDetail.value = res.playlist
        let trackIds = res.playlist.trackIds.map(item => {
          return item.id
        })
        loading.value = false
        let data = await Api.getSongDetail(trackIds.join(','))
        console.log(data)
        if (data.code == 200) {
          songList.value = data.songs
        }
      }
    }

    getAlbumDetail()

    //滚动时修改header颜色
    const color = ref('rgba(255,255,255,0)')

    const changeHeaderColor = _.throttle(e => {
      if (e.target.scrollTop > 0) {
        color.value = 'rgba(0,0,0,0.3)'
      } else {
        color.value = 'rgba(255,255,255,0)'
      }
    }, 100)

    //滚动时监听滚动高度，控制背景图全关全开
    const containerScrollTop = ref(null)
    const touchstart = _.throttle(e => {
      containerScrollTop.value = document.querySelector(
        '.albumSonge-container'
      ).scrollTop
    }, 200)
    const touchend = _.throttle(e => {
      let temp = document.querySelector('.albumSonge-container').scrollTop
      if (containerScrollTop.value - temp < 0) {
        document.querySelector('.albumSonge-container').scrollTop =
          document.querySelector('.cover').clientHeight
      } else {
        document.querySelector('.albumSonge-container').scrollTop = 0
      }
    }, 200)

    //修改content的内容高度，使得容器可以滚动
    onUpdated(() => {
      let bodyHeight = document.querySelector('body').clientHeight
      let coverHeight = document.querySelector('.cover').clientHeight

      document.querySelector('.content').style.height =
        bodyHeight + coverHeight + 'px'
    })

    return {
      albumDetail,
      songList,
      loading,
      color,
      changeHeaderColor,
      touchend,
      touchstart
    }
  }
})
</script>

<style lang="scss" scoped>
.albumSonge-container {
  overflow: auto;
  height: 675px;
  &::-webkit-scrollbar {
    display: none;
  }
  .header {
    color: #fff;
    box-sizing: border-box;
    position: fixed;
    z-index: 1000;
    width: 100%;
    padding: 0.2133rem 0.2133rem;
    height: 0.8533rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .back {
        transform: rotate(90deg);
      }
      span {
        margin-left: 0.32rem;
        font-size: 0.4267rem;
      }
    }
    .header-right {
      .search {
        margin-right: 0.32rem;
      }
      .ellipsis {
        transform: rotate(90deg);
      }
    }
  }

  .cover {
    position: relative;
    padding-bottom: 0.32rem;
    .coverImg {
      height: 5.3333rem;
      width: 100%;
      background-size: 100%;
      background-repeat: no-repeat;
      filter: blur(100px);
      position: relative;
      z-index: -1;
      border-radius: 0 0 80% 80%;
    }
    .detail {
      z-index: 100;
      position: absolute;
      left: 50%;
      top: 1.6rem;
      transform: translate(-50%);
      display: flex;
      justify-content: flex-start;
      width: 100%;
      .image {
        margin-left: 0.32rem;
      }
      .desc {
        margin: 0 0.32rem;
        line-height: 0.5333rem;
        color: #fff;
        font-weight: bolder;
        font-size: 0.3733rem;
        .description {
          margin-top: 0.32rem;
          color: rgb(112, 111, 111);
          font-weight: 400;
          font-size: 0.32rem;
        }
      }
    }
    .buttonList {
      position: relative;
      z-index: 100;
      height: 0.8533rem;
      text-align: center;
      :deep(.van-button) {
        border: none;
        border-right: 1px solid rgb(154, 150, 150);
        border-radius: 0;
        width: 2.3467rem;
        height: 0.8533rem;
      }
      & :deep(.van-button):nth-child(1) {
        border-radius: 0.8533rem 0 0 0.8533rem;
      }
      & :deep(.van-button):nth-child(3) {
        border-right: none;
        border-radius: 0 0.8533rem 0.8533rem 0;
      }
    }
  }

  .song-list {
    position: sticky;
    top: 0.8533rem;
    height: 200px;
    background-color: red;
  }
}
</style>
