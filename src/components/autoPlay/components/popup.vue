<template>
  <van-overlay v-model:show="show" class-name="music-overlay" :z-index="100">
    <img class="backgroundImg" :src="playDetail.al.picUrl">
    <header class="overlay-header">
      <van-icon
        name="arrow-down"
        size="24"
        color="#fff"
        @click="closeOverlay"
      />
    </header>
  </van-overlay>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue'

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

    const closeOverlay = () => {
      show.value = false
    }

    return {
      show,
      playDetail,
      closeOverlay
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
    top:50%;
    transform: translate(-50%,-50%);
    z-index: -1;
    filter: blur(80px);
  }
  .overlay-header {
    padding: 0.32rem;
  }
}
</style>
