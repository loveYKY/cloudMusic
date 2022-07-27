<template>
  <van-popup v-model:show="show" position="left" :style="{ height: '100%' }" >
    <div class="leftPopup-container">
        
    </div>
  </van-popup>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:visible'],
  setup(props, context) {
    const { visible } = toRefs(props)
    const show = computed({
      get: function () {
        return visible.value
      },
      set: function (val) {
        context.emit('update:visible', val)
      }
    })

    return {
      show,
    }
  }
})
</script>

<style lang="scss" scoped>
.leftPopup-container {
    width: 80vw;
}

</style>
