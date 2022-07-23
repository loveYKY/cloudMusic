<template>
  <van-overlay v-model:show="show" class-name="music-overlay" :z-index="100">
    <img class="backgroundImg" :src="playDetail.al.picUrl" />
    <div class="overlay-container">
      <header class="overlay-header">
        <van-icon
          name="arrow-down"
          size="24"
          color="#fff"
          @click="closeOverlay"
        />
        <div class="title">
          <p class="longFont">{{ playDetail.name }}</p>
        </div>
      </header>

      <img
        src="@/assets/png/needle-ab.png"
        class="needle"
        :class="{ 'needle-play': playControl, 'needle-stop': !playControl }"
      />

      <div class="cdBackground">
        <van-icon
          :name="playControl ? 'stop-circle-o' : 'play-circle-o'"
          class="play-circle"
          size="48"
          @click="play"
        />
        <img
          :src="`${playDetail.al.picUrl}?param=200y200`"
          :class="{ 'rotate-active': playControl }"
        />
      </div>

      <div class="footer">
        <div class="funcList">
          <van-icon name="like-o" size="20" />
          <van-icon name="chat-o" badge="99+" size="20" />
          <van-icon name="wap-nav" size="20" />
        </div>
        <van-slider
          class="slider"
          v-model="progress"
          button-size="16"
          inactive-color="#7c7c7b"
          active-color="#fff"
          bar-height="0.5px"
        />
        <div class="playButton">
          <img src="@/assets/png/before.png" @click="nextSong" />
          <van-icon
            :name="playControl ? 'stop-circle-o' : 'play-circle-o'"
            size="42"
            color="white"
            @click="play"
          />
          <img src="@/assets/png/next.png" @click="beforeSong" />
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { computed, defineComponent, toRefs, ref, onMounted } from 'vue'
import store from '@/store'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    playDetail: {
      type: Object,
      require: true
    }
  },
  emits: ['update:visible'],
  setup(props, context) {
    const { visible, playDetail } = toRefs(props)
    console.log(playDetail.value)
    const show = computed({
      get: function () {
        return visible.value
      },
      set: function (val) {
        context.emit('update:visible', val)
      }
    })

    const playControl = computed({
      get: function () {
        return store.state.playControl
      }
    })

    const play = () => {
      store.commit('changeControl')
    }

    const closeOverlay = () => {
      show.value = false
    }

    //下一首歌
    const nextSong = () => {
      store.commit('changeIndex')
    }
    //上一首歌
    const beforeSong = () => {
      store.commit('beforeSong')
    }

    //当前播放时间
    const currentTime = computed({
      get: function () {
        return store.state.currentTime
      }
    })
    //总播放时长
    const duration = ref(document.querySelector('#audio').duration)

    // 播放进度
    const progress = computed({
      get: function () {
        return (currentTime.value / duration.value) * 100
      },
      set: function (val) {
        document.querySelector('#audio').currentTime =
          (val * duration.value) / 100
      }
    })

    return {
      show,
      playDetail,
      closeOverlay,
      playControl,
      play,
      currentTime,
      nextSong,
      beforeSong,
      progress,
      duration
    }
  }
})
</script>

<style lang="scss" scoped>
.music-overlay {
  overflow: hidden;
  .backgroundImg {
    width: 200%;
    height: 200%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    filter: blur(80px);
  }
  .overlay-container {
    position: relative;
    height: 100%;
    .overlay-header {
      padding: 0.32rem;
      position: relative;
      .title {
        position: absolute;
        overflow: hidden;
        width: 40%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 0.4267rem;
        .longFont {
          display: inline-block;
          white-space: nowrap;
          animation: move 8s linear infinite;
        }
      }
    }
    .needle {
      transform-origin: 0 0;
      transition: transform 0.3s linear;
    }
    .needle-play {
      position: absolute;
      top: 1.28rem;
      left: 60%;
      width: 2.5rem;
      z-index: 1;
      transform: rotate(0deg) translate(-50%);
    }
    .needle-stop {
      position: absolute;
      top: 1.28rem;
      left: 60%;
      transform: rotate(-30deg) translate(-45%, -13%);
      width: 2.5rem;
    }
    .rotate-active {
      animation: rotate 10s linear infinite;
    }
    .cdBackground {
      position: relative;
      margin: 2rem auto;
      background-image: url('@/assets/png/cd.png');
      height: 5.3333rem;
      width: 5.3333rem;
      background-repeat: no-repeat;
      background-size: 100%;
      .play-circle {
        color: #fff;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
      }
      img {
        position: absolute;
        z-index: -1;
        width: 4rem;
        height: 4rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4rem;
      }
    }
    .footer {
      position: absolute;
      bottom: 20px;
      width: 100%;
      .funcList {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .slider {
        margin: 0.32rem 0;
      }
      .playButton {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}

@keyframes move {
  0% {
    transform: translate(110%, 0);
  }
  100% {
    transform: translate(calc(-110%), 0);
  }
}
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
