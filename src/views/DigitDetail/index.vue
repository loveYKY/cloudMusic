<template>
  <div class="container">
    <header class="header">
      <div class="header-left">
        <van-icon name="down" class="back" size="24" @click="goBack" />
        <span>数字专辑</span>
      </div>
    </header>
    <div class="container-top">
      <van-image
        class="coverUrl"
        width="4.8rem"
        height="4.8rem"
        radius="10px"
        fit="contain"
        :src="`${digitData?.album.coverUrl}?param=200y200`"
      />
    </div>
    <div class="container-bottom"> </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/index'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const digitId = route.query.id
    const digitData = ref(null)

    const getDetail = async () => {
      let res = await Api.getDigitDetail(digitId)
      digitData.value = res
      console.log(digitData.value.album)
    }

    getDetail()

    const goBack = () => {
      router.back()
    }

    return {
      digitData,
      goBack
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  cursor: none;
  overflow: auto;
  background: linear-gradient(to right, #283048, #859398);
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
  }

  .container-top {
    .coverUrl {
      margin-top: 2.1333rem;
      margin-left: calc(50vw - 2.4rem);
    }
  }
  .container-bottom {
    height: 1000px;
  }
}
</style>
