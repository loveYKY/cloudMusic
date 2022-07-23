<template>
  <div class="container">
    <van-icon class="back" name="arrow-left" size="25" @click="back"/>
    <h2>歌单广场</h2>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'header',
  setup() {
    const router = useRouter()
    const back = () => {
      router.go(-1)
    }

    return {
      back,
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 0.3rem 0.3rem 0 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.02rem;
  .back {
    position: absolute;
    margin-right: 9rem;
  }
}
</style>
