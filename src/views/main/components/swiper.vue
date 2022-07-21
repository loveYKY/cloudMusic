<template>
  <div class="container">
    <van-swipe class="my-swipe" :autoplay="3000" :lazy-render="true">
      <van-swipe-item v-for="(item, index) in swipeArr" :key="index">
        <img class="imgItem" :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="naviList">
      <div v-for="(item, index) in naviArr" :key="index" class="listItem">
        <div class="background">
          <van-icon :name="item.image" class="item" size="20" color="red" />
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import Api from '@/api/index.js'
export default defineComponent({
  name: 'swipe',
  setup() {
    //轮播图数组
    const swipeArr = ref([])
    //导航栏数组
    const naviArr = ref([
      {
        name: '每日推荐',
        path: '',
        image: 'thumb-circle'
      },
      {
        name: '私人FM',
        path: '',
        image: 'wap-home'
      },
      {
        name: '歌单',
        path: '',
        image: 'todo-list'
      },
      {
        name: '排行榜',
        path: '',
        image: 'hot'
      }
    ])
    //获取轮播图
    const getSwiper = async () => {
      let res = await Api.getSwiper({})
      if (res.code == 200) {
        swipeArr.value = res.banners
      }
    }
    getSwiper()
    return {
      swipeArr,
      naviArr
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 5.5467rem;
  border-bottom: 1px solid rgb(223, 220, 220);
  .my-swipe {
    border-radius: 6px;
    width: 100%;
    height: 3.4667rem;
    .imgItem {
      border-radius: 6px;
      width: 100%;
      height: 3.4667rem;
    }
  }
  .naviList {
    margin-top: 0.32rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listItem {
      text-align: center;
      .background {
        margin: 0 auto;
        height: 0.8533rem;
        width: 0.8533rem;
        border-radius: 0.8533rem;
        background-color: #f4a5a5;
        position: relative;
        .item {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .title {
        margin-top: 0.2133rem;
        color: rgb(170, 168, 168);
      }
    }
  }
}
</style>
