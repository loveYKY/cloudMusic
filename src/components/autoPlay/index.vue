<template>
  <div class="autoPlay-container" @click="changeVisible">
    <div class="container-left">
      <img :src="playList[playIndex].al.picUrl" class="alPic" />
      <span class="alName">{{ playList[playIndex].name }}</span>
    </div>
    <div>
      <van-icon
        name="play-circle-o"
        size="24"
        style="margin-right: 0.32rem"
        v-show="!control"
        @click.stop="changeControl"
      />
      <van-icon
        name="stop-circle-o"
        size="24"
        style="margin-right: 0.32rem"
        v-show="control"
        @click.stop="changeControl"
      />
      <van-icon name="wap-nav" size="24" style="margin-right: 0.32rem" />
    </div>
  </div>
  <audio
    id="audio"
    v-show="true"
    @ended="ended"
    :src="` https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`"
    @timeupdate="timeupdate"
  ></audio>

  <Popup v-model:visible="visible" :playDetail="playList[playIndex]" v-if="visible"></Popup>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'
import Store from '@/store'
import Popup from './components/popup.vue'
export default defineComponent({
  components: {
    Popup
  },
  setup() {
    const visible = ref(false)

    const changeVisible = () => {
      visible.value = true
    }
    const playList = computed({
      get: function () {
        return Store.state.playList
      }
    })
    const playIndex = computed({
      get: function () {
        return Store.state.playIndex
      }
    })

    const control = computed({
      get: function () {
        return Store.state.playControl
      }
    })

    const changeControl = () => {
      Store.commit('changeControl')
    }

    const ended = () => {
      Store.commit('changeIndex')
    }

    const timeupdate = () => {
      let currentTime = document.querySelector('#audio').currentTime
      Store.commit('timeupdate', currentTime)
    }

    watch(control, cur => {
      if (cur) {
        document.getElementById('audio').play()
      } else {
        document.getElementById('audio').pause()
      }
    })
    watch(playIndex, cur => {
      document.getElementById('audio').autoplay = true
    })
    return {
      changeVisible,
      visible,
      control,
      playList,
      playIndex,
      ended,
      changeControl,
      timeupdate
    }
  }
})
</script>

<style lang="scss" scoped>
.autoPlay-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8533rem;
  background-color: #fff;
  border-top: 1px solid rgb(223, 220, 220);
  .container-left {
    margin-left: 0.32rem;
    position: relative;
    .alPic {
      position: absolute;
      top: -0.32rem;
      height: 0.8rem;
      width: 0.8rem;
      border-radius: 0.7467rem;
    }
    .alName {
      margin-left: 1.0667rem;
    }
  }
}
</style>
