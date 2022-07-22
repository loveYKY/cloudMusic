<template>
  <div class="autoPlay-container">
    <div>音乐名</div>
    <div>
      <van-icon
        name="play-circle-o"
        size="24"
        style="margin-right: 0.32rem"
        v-show="control == 'play'"
      />
      <van-icon
        name="stop-circle-o"
        size="20"
        style="margin-right: 0.32rem"
        v-show="control == 'stop'"
      />
      <van-icon name="wap-nav" size="24" style="margin-right: 0.32rem" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const control = ref('play')

    return {
      control
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
}
</style>
