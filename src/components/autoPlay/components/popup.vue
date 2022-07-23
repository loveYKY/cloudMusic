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
        <img :src="`${playDetail.al.picUrl}?param=200y200`" />
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue'
import Store from '@/store'
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

    return {
      show,
      playDetail,
      closeOverlay,
      playControl,
      play
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
          animation: move 3s linear infinite;
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
    .cdBackground {
      position: relative;
      margin: 2rem auto;
      background-image: url('@/assets/png/cd.png');
      height: 5.3333rem;
      width: 5.3333rem;
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
  }
}

@keyframes move {
  0% {
    transform: translate(150%, 0);
  }
  100% {
    transform: translate(calc(-150%), 0);
  }
}
</style>
