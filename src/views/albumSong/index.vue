<template>
  <div class="albumSonge-container" @scroll="changeHeaderColor">
    <header class="header" :style="{ backgroundColor: color }">
      <div class="header-left">
        <van-icon name="down" class="back" size="24" @click="goBack" />
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
            <van-button type="default" @click="jumpToComment"
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

      <van-sticky offset-top="0.8533rem">
        <div class="playAll">
          <div>
            <van-icon name="play-circle" size="24" color="red" />
            <span
              style="margin-left: 12px; font-weight: bolder; font-size: 14px"
              >播放全部 ({{ albumDetail.trackCount }})</span
            >
          </div>
          <div>
            <van-icon name="certificate" size="24" />
          </div>
        </div>
      </van-sticky>

      <div class="songList">
        <div
          v-for="(item, index) in songList"
          :key="index"
          class="song-item"
          @click="playMusic(item)"
        >
          <div class="index">{{ index + 1 }}</div>
          <div class="content">
            <div class="alAndar">
              <p class="van-ellipsis"
                ><span>{{ item.name }}</span
                ><span style="color: rgb(167, 164, 164); margin-left: 4px">{{
                  item.al.name
                }}</span></p
              >
              <p>{{ item.ar[0].name }}</p>
            </div>
            <div style="margin-right: 24px">
              <van-icon name="play-circle-o" size="20" />
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/index.js'
var _ = require('lodash')
import Store from '@/store'
export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(true)
    const albumId = ref(route.query.id)
    const albumDetail = ref({})
    const songList = ref([])

    const goBack = () => {
      router.push('/main')
    }

    //获取歌单详情信息
    const getAlbumDetail = async () => {
      let res = await Api.getAlbumDetail(albumId.value)
      if (res.code == 200) {
        albumDetail.value = res.playlist
        songList.value = res.playlist.tracks
        let trackIds = res.playlist.trackIds.map(item => {
          return item.id
        })
        loading.value = false
        let data = await Api.getSongDetail(trackIds.join(','))
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
        color.value = 'rgba(0,0,0,0.2)'
      } else {
        color.value = 'rgba(255,255,255,0)'
      }
    }, 100)

    //给最外部盒子一个固定高度，使得页面可以滚动
    onMounted(() => {
      let bodyHeight = document.querySelector('body').clientHeight

      document.querySelector('.albumSonge-container').style.height =
        bodyHeight + 'px'
    })

    //单独音乐加入到播放列表，并播放
    const playMusic = item => {
      let obj = {
        al: item.al,
        id: item.id,
        name: item.name
      }
      Store.commit('updatePlayList', obj)
      document.getElementById('audio').autoplay = true
    }

    //跳转到歌单评论区
    const jumpToComment = () => {
      router.push({
        path: '/comment',
        query: {
          type: 'playlist',
          id: albumId.value,
          picUrl: albumDetail.value.coverImgUrl,
          name: albumDetail.value.name,
          number:albumDetail.value.commentCount,
          creator:albumDetail.value.creator.nickname
        }
      })
    }

    return {
      goBack,
      albumDetail,
      songList,
      loading,
      color,
      changeHeaderColor,

      playMusic,
      jumpToComment,
    }
  }
})
</script>

<style lang="scss" scoped>
.albumSonge-container {
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .header {
    color: #fff;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    padding: 0.2133rem 0.2133rem;
    height: 0.8533rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
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
      border-radius: 0 0 80% 80%;
    }
    .detail {
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

  .playAll {
    background-color: #fff;
    height: 1.28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.32rem;
    z-index: 1000;
    &:active {
      background-color: rgb(190, 188, 188);
    }
    div {
      display: flex;
      align-items: center;
    }
  }
  .songList {
    .song-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &:active {
        background-color: rgb(190, 188, 188);
      }
      .index {
        height: 1.28rem;
        width: 1.28rem;
        text-align: center;
        line-height: 1.28rem;
        font-size: 0.3733rem;
        color: rgb(179, 178, 178);
      }
      .content {
        height: 1.28rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .alAndar {
          width: 6.6667rem;
          & p:nth-child(1) {
            font-size: 0.3733rem;
          }
          & p:nth-child(2) {
            margin-top: 0.1067rem;
            color: rgb(167, 164, 164);
          }
        }
      }
    }
    .footer {
      height: 1.28rem;
      width: 1.28rem;
    }
  }
}
</style>
