<template>
  <div class="comment-container">
    <header class="header">
      <div class="header-left">
        <van-icon name="down" class="back" size="24" @click="goBack" />
        <span
          >评论<span v-if="modelRef.number != null"
            >({{ modelRef.number }})</span
          ></span
        >
      </div>
    </header>

    <div class="content">
      <div class="detail">
        <div>
          <img :src="`${modelRef.picUrl}?param=50y50`" />
          <div class="desc">
            <p>{{ modelRef.name }}</p>
            <p v-if="modelRef.creator != null">by{{ modelRef.creator }}</p>
          </div>
        </div>
        <van-icon name="arrow" />
      </div>

      <div class="comment">
        <div class="title">评论区</div>
        <div class="outsideBox" @scroll="scrollFn">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="updateComment"
          >
            <div class="insideBox" :style="`height: ${listHeight}px`">
              <div
                class="comment-itemList"
                :style="`transform:translate3d(0,${visual_scroll.offsetY}px,0)`"
              >
                <template v-for="(item, index) in curList" :key="index">
                  <div class="comment-item" :class="`item${item.key}`">
                    <img :src="`${item.user.avatarUrl}?param=30y30`" />
                    <div class="comment-item-detail">
                      <p class="detail-nickname">{{ item.user.nickname }}</p>
                      <p class="detail-time">{{ item.timeStr }}</p>
                      <p class="detail-comment">{{ item.content }}</p>
                      <p
                        class="detail-reply"
                        v-show="item.beReplied.length != 0"
                      >
                        <span @click="showReplyFn(item)"
                          >{{ item.beReplied.length }}条回复</span
                        >
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
  <BeReplied
    v-model:showReply="showReply"
    :replyDetail="replyDetail"
  ></BeReplied>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  nextTick,
  watch
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/index'
var _ = require('lodash')
import BeReplied from './components/beReplied.vue'
export default defineComponent({
  components: {
    BeReplied
  },
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }

    const modelRef = ref({
      pageIndex: 0,
      offset: 0,
      limit: 100,
      id: route.query.id,
      //评论类型
      type: route.query.type,
      //图片
      picUrl: route.query.picUrl,
      //名字(歌曲、歌单)
      name: route.query.name,
      //评论数量
      number: route.query.number ? route.query.number : null,
      //创造者
      creator: route.query.creator ? route.query.creator : null
    })

    //完整的数据数组
    const comment = ref([])
    //虚拟滚动参数
    const visual_scroll = ref({
      //可视区域偏移高度
      offsetY: 0,
      //缓存区长度,比例,
      cache: 2,
      //起始索引
      startIndex: 0,
      //结束索引
      endIndex: 0,
      //预估高度
      estimatedItemSize: 100,
      //列表项渲染后存储每一项的高度以及位置信息
      positions: [],
      //渲染区域高度
      screenHeight: 0
    })

    //可视渲染条数
    const visibleCount = computed({
      get: function () {
        return Math.ceil(
          visual_scroll.value.screenHeight /
            visual_scroll.value.estimatedItemSize
        )
      }
    })

    //上缓存区
    const aboveCount = computed({
      get: function () {
        return Math.min(
          visual_scroll.value.startIndex,
          visual_scroll.value.cache * visibleCount.value
        )
      }
    })
    //下缓存区
    const belowCount = computed({
      get: function () {
        return Math.min(
          comment.value.length - visual_scroll.value.endIndex,
          visual_scroll.value.cache * visibleCount.value
        )
      }
    })
    //当前渲染数据
    const curList = computed({
      get: function () {
        let start = visual_scroll.value.startIndex - aboveCount.value
        let end = visual_scroll.value.endIndex + belowCount.value
        return comment.value.slice(start, end)
      }
    })

    const listHeight = computed({
      get: function () {
        if (visual_scroll.value.positions.length == 0) return 0
        return visual_scroll.value.positions[
          visual_scroll.value.positions.length - 1
        ].bottom
      }
    })

    onMounted(() => {
      visual_scroll.value.screenHeight =
        document.querySelector('.outsideBox').clientHeight
      visual_scroll.value.startIndex = 0
      visual_scroll.value.endIndex =
        visual_scroll.value.startIndex + visibleCount.value
    })

    //二分法查找
    const binarySearch = (list, value) => {
      let start = 0
      let end = list.length - 1
      let tempIndex = null
      while (start <= end) {
        let midIndex = parseInt((start + end) / 2)
        let midValue = list[midIndex].bottom
        if (midValue === value) {
          return midIndex + 1
        } else if (midValue < value) {
          start = midIndex + 1
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex
          }
          end = end - 1
        }
      }
      return tempIndex
    }

    //获取索引
    const getIndex = scrollTop => {
      return binarySearch(visual_scroll.value.positions, scrollTop)
    }

    //获取当前偏移量
    const setStartOffset = () => {
      //获取偏移量
      if (visual_scroll.value.startIndex >= 1) {
        let size =
          visual_scroll.value.positions[visual_scroll.value.startIndex].top -
          (visual_scroll.value.positions[
            visual_scroll.value.startIndex - aboveCount.value
          ]
            ? visual_scroll.value.positions[
                visual_scroll.value.startIndex - aboveCount.value
              ].top
            : 0)

        visual_scroll.value.offsetY =
          visual_scroll.value.positions[visual_scroll.value.startIndex - 1]
            .bottom - size
      } else {
        visual_scroll.value.offsetY = 0
      }
    }

    //滚动事件
    const scrollFn = _.throttle(e => {
      let scrollTop = e.target.scrollTop

      visual_scroll.value.startIndex = getIndex(scrollTop)
      visual_scroll.value.endIndex =
        visual_scroll.value.startIndex + visibleCount.value

      setStartOffset()
    }, 100)

    watch(
      curList,
      () => {
        let itemList = document.getElementsByClassName('comment-item')
        if (itemList.length == 0) return
        for (let i = 0; i < itemList.length; i++) {
          //根据class获取该元素对应的下标值
          let index = Number(itemList[i]?.classList[1]?.split('item')[1])
          //根据dom获取该元素的高度
          let rect = itemList[i]?.getBoundingClientRect()
          let domHeight = rect.height
          //从列表高度信息数组取出数据对比
          let oldHeight = visual_scroll.value.positions[index]?.height
          let dValue = oldHeight - domHeight

          //更新列表高度信息
          if (dValue != 0) {
            visual_scroll.value.positions[index].bottom =
              visual_scroll.value.positions[index].bottom - dValue
            visual_scroll.value.positions[index].height = domHeight

            for (
              let k = index + 1;
              k < visual_scroll.value.positions.length;
              k++
            ) {
              visual_scroll.value.positions[k].top =
                visual_scroll.value.positions[k - 1].bottom
              visual_scroll.value.positions[k].bottom =
                visual_scroll.value.positions[k].bottom - dValue
            }
          }
        }
        setStartOffset()
      },
      {
        immediate: false
      }
    )

    const loading = ref(false)
    const finished = ref(false)

    const updateComment = async () => {
      let res = await Api.getComment(
        modelRef.value.type,
        modelRef.value.id,
        modelRef.value.limit,
        modelRef.value.offset
      )
      if (res.code == 200) {
        let arr = res.comments.map((item, index) => {
          return {
            ...item,
            key: index + modelRef.value.offset
          }
        })
        comment.value = comment.value.concat(arr)

        let lastBottom = 0
        if (visual_scroll.value.positions.length != 0) {
          lastBottom =
            visual_scroll.value.positions[
              visual_scroll.value.positions.length - 1
            ].bottom
        }
        visual_scroll.value.positions = visual_scroll.value.positions.concat(
          arr.map((item, index) => {
            let temp = index + modelRef.value.offset
            return {
              index: temp,
              top: lastBottom + index * visual_scroll.value.estimatedItemSize,
              height: visual_scroll.value.estimatedItemSize,
              bottom:
                lastBottom + (index + 1) * visual_scroll.value.estimatedItemSize
            }
          })
        )
      }
      loading.value = false
      modelRef.value.pageIndex = modelRef.value.pageIndex + 1
      modelRef.value.offset = modelRef.value.pageIndex * modelRef.value.limit
    }

    //回复弹窗
    const showReply = ref(false)

    const replyDetail = ref(null)

    const showReplyFn = item => {
      replyDetail.value = item
      showReply.value = true
    }

    return {
      modelRef,
      listHeight,
      comment,
      curList,
      visual_scroll,
      goBack,
      scrollFn,
      updateComment,
      loading,
      finished,

      showReply,
      showReplyFn,
      replyDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.comment-container {
  background-color: rgb(245 242 242);
  .header {
    background-color: #fff;
    box-sizing: border-box;
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
  .content {
    .detail {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.32rem 0.32rem;
      &:active {
        background-color: rgb(211, 207, 207);
      }
      & > div {
        display: flex;
        justify-content: flex-start;
        .desc {
          margin-left: 0.32rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        img {
          height: 1.28rem;
          width: 1.28rem;
          border-radius: 0.16rem;
        }
      }
    }

    .comment {
      background-color: #fff;
      margin-top: 0.2133rem;
      padding: 0px 0.32rem;
      .title {
        height: 0.64rem;
        display: flex;
        align-items: center;
      }
      .outsideBox {
        height: 75vh;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .comment-item {
          display: flex;
          justify-content: flex-start;
          padding-top: 0.32rem;
          img {
            height: 0.8rem;
            width: 0.8rem;
            border-radius: 0.8rem;
          }
          .comment-item-detail {
            flex: 1;
            margin-left: 0.32rem;
            border-bottom: 1px solid #cfcfcf;
            .detail-nickname {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 13px;
            }
            .detail-time {
              margin-top: 0.0533rem;
              color: #999;
            }
            .detail-comment {
              margin: 0.32rem 0 0.2133rem 0;
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              font-size: 14px;
              line-height: 20px;
            }
            .detail-reply {
              margin: 0.32rem 0 0.2133rem 0;
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              font-size: 12px;
              color: #4d88ff;
              & span:active {
                background-color: rgb(200, 196, 196);
              }
            }
          }
        }
      }
    }
  }
}
</style>
