<template>
  <div class="autoPlay-container">
    <div class="container-left">
      <img :src="playList[playIndex].al.picUrl" class="alPic" />
      <span class="alName">{{ playList[playIndex].al.name }}</span>
    </div>
    <div>
      <van-icon
        name="play-circle-o"
        size="24"
        style="margin-right: 0.32rem"
        v-show="!control"
        @click="changeControl"
      />
      <van-icon
        name="stop-circle-o"
        size="24"
        style="margin-right: 0.32rem"
        v-show="control"
        @click="changeControl"
      />
      <van-icon name="wap-nav" size="24" style="margin-right: 0.32rem" />
    </div>
  </div>
  <audio
    id="audio"
    v-show="true"
    :src="` https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`"
  ></audio>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import Store from '@/store'
export default defineComponent({
  setup() {
    const control = ref(false)
    const playList = Store.state.playList
    const playIndex = Store.state.playIndex

    const changeControl = () => {
      control.value = !control.value
    }

    watch(control, cur => {
      if (cur) {
        document.getElementById('audio').play()
      }else {
        document.getElementById('audio').pause()
      }
    })
    return {
      control,
      playList,
      playIndex,

      changeControl
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
