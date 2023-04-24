<template>
  <div class="rankingList-container">
    <header class="title">
      <div>排行榜</div>
      <van-button type="default" class="moreBtn"
        ><span>更多</span><van-icon name="arrow"
      /></van-button>
    </header>
    <div class="rankList" @scroll="getScrollLeft">
      <div v-for="(item, index) in rankList" :key="index" class="imageItem">
        <div class="itemBlock">
          <div class="name">
            {{ item.name }}
            <van-icon name="arrow" />
          </div>
          <div class="content">
            <img v-lazy="`${item.coverImgUrl}?param=200y200`" />
            <div class="desc">
              {{ item.description?.slice(0, 100) + '...' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, inject, watch } from 'vue'
import Api from '@/api/index.js'
var _ = require('lodash')
export default defineComponent({
  setup() {
    const rankList = ref([])
    const totalList = ref([])
    const startIndex = ref(0)
    let imgWidth = document.querySelector('html').style.fontSize.split('px')[0]

    const getRankingList = async () => {
      let res = await Api.getRankingList()
      if (res.code == 200) {
        totalList.value = res.list
        rankList.value = res.list.slice(0, 6).map((item, index) => {
          return {
            ...item,
            playCount: parseInt(item.playCount / 10000),
            leftBorder: index * imgWidth * 7.8
          }
        })
      }
    }
    getRankingList()

    //监听刷新
    const refresh = inject('refresh')
    watch(refresh, () => {
      if (refresh.value == true) {
        startIndex.value++
        if (startIndex.value == 5) startIndex.value = 0
        rankList.value = totalList.value
          .slice(startIndex.value * 6, (startIndex.value + 1) * 6)
          .map((item, index) => {
            return {
              ...item,
              playCount: parseInt(item.playCount / 10000),
              leftBorder: index * imgWidth * 7.8
            }
          })
      }
    })

    return {
      rankList
    }
  }
})
</script>

<style lang="scss" scoped>
.rankingList-container {
  height: 5.8667rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.4267rem;
    font-weight: bolder;
    padding: 0.5333rem 0;
    .moreBtn {
      padding: 0 0.16rem 0 0.2rem;
      height: 0.48rem;
      border-radius: 0.48rem;
      font-size: 0.32rem;
      font-weight: normal;
    }
  }
}

.rankList {
  display: flex;
  overflow-x: auto;
  .imageItem {
    margin-right: 0.2133rem;
    position: relative;
    .itemBlock {
      width: 7.8rem;
      padding: 0.32rem;
      border-radius: 10px;
      border: 1px solid #ebedf0;
      box-shadow: 3px 3px 4px #d8dade;
      animation: appear 0.5s linear;
      .name {
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .content {
        margin-top: 0.32rem;
        display: flex;
        justify-content: flex-start;
        img {
          height: 2.7rem;
          width: 2.7rem;
          border-radius: 6px;
          animation: appear 0.5s linear;
        }
        .desc {
          margin-left: 0.1067rem;
          line-height: 0.3733rem;
        }
      }
    }
  }
  & .imageItem:nth-child(6) {
    margin-right: 0px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
