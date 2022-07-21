<template>
  <div class="album-container">
    <header class="title">
      <div>数字专辑</div>
      <van-button type="default" class="moreBtn"
        ><span>更多</span><van-icon name="arrow"
      /></van-button>
    </header>

    <div class="albumList" @scroll="getScrollLeft">
      <div v-for="(item, index) in albumList" :key="index" class="block">
        <template v-if="scrollLeft + clientWidth > item.leftBorder">
          <div
            v-for="(childItem, childIndex) in item.data"
            :key="childIndex"
            class="blockItem"
          >
            <img :src="`${childItem.coverUrl}?param=75y75`" />
            <div>
              <p>{{
                childItem.albumName.length > 20
                  ? childItem.albumName.slice(0, 20) + '...'
                  : childItem.albumName
              }}</p>
              <p>{{ childItem.artistName }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, inject, watch } from 'vue'
import Api from '@/api/index.js'

export default defineComponent({
  setup() {
    const albumList = ref([])
    for (let i = 0; i < 6; i++) {
      albumList.value.push([])
    }
    let imgWidth = document.querySelector('html').style.fontSize.split('px')[0]

    const getAlbumList = async () => {
      let res = await Api.getAlbumList()
      if (res.code == 200) {
        for (let i = 0; i < albumList.value.length; i++) {
          albumList.value[i] = {
            leftBorder: i * imgWidth * 8.8,
            data: res.products.slice(i * 3, (i + 1) * 3)
          }
        }
      }
    }

    getAlbumList()

    //懒加载实现
    const clientWidth = ref(0)
    //图片宽度
    onMounted(() => {
      clientWidth.value = document.querySelector('.album-container').clientWidth
    })
    const scrollLeft = ref(0)
    //获取横向滚动条进度
    const fn = e => {
      scrollLeft.value = e.target.scrollLeft
    }
    const getScrollLeft = _.throttle(fn, 100)

    return {
      albumList,
      getScrollLeft,
      scrollLeft,
      clientWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.album-container {
  height: 6.1867rem;
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
  .albumList {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    .block {
      animation: appear 0.5s linear;
      & .blockItem:nth-of-type(3) {
        & div {
          border-bottom: none;
        }
      }
      & .blockItem:nth-of-type(1) {
        margin-top: 0;
      }
      .blockItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 0.4267rem;
        margin-top: 0.16rem;
        img {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 6px;
          animation: appear 0.5s linear;
        }
        div {
          width: 6.8rem;
          border-bottom: 1px solid rgb(223, 220, 220);
          margin-left: 0.32rem;
          padding-bottom: 0.1067rem;
          & p:nth-child(1) {
            font-size: 0.3733rem;
          }
          & p:nth-child(2) {
            margin-top: 0.1067rem;
            color: rgb(192, 187, 187);
          }
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
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
