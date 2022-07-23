<template>
  <router-view />
  <div class="autoPlay">
    <AutoPlay></AutoPlay>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AutoPlay from '@/components/autoPlay/index.vue'
export default defineComponent({
  components: {
    AutoPlay
  },
  setup() {}
})
</script>

<style lang="scss">
html {
  overflow: hidden;
}
#app {
  height: 100%;
}
.autoPlay {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10000;
}
</style>
