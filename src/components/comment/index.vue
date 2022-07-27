<template>
  <div class="comment-container">
    <header class="header">
      <div class="header-left">
        <van-icon name="down" class="back" size="24" @click="goBack" />
        <span>评论({{ modelRef.number }})</span>
      </div>
    </header>

    <div class="content">
      <div class="detail">
        <div>
          <img :src="`${modelRef.picUrl}?param=50y50`" />
          <div class="desc">
            <p>{{ modelRef.name }}</p>
            <p>by{{ modelRef.creator }}</p>
          </div>
        </div>
        <van-icon name="arrow" />
      </div>

      <div class="comment">
        <div class="title">评论区</div>
        <div class="outsideBox">
          <div class="insideBox">
            <div class="comment-itemList">
              <template v-for="(item, index) in comment" :key="index">
                <div class="comment-item">
                  <img :src="`${item.user.avatarUrl}?param=30y30`" />
                  <div class="comment-item-detail">
                    <p class="detail-nickname">{{ item.user.nickname }}</p>
                    <p class="detail-time">{{ item.timeStr }}</p>
                    <p class="detail-comment">{{ item.content }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/index'
import moment from 'moment'
export default defineComponent({
  setup(props, context) {
    const route = useRoute()
    console.log(route.query)
    const goBack = () => {
      window.history.back(-1)
    }

    const modelRef = ref({
      offset: 0,
      limit: 100,
      id: route.query.id,
      type: route.query.type,
      picUrl: route.query.picUrl,
      name: route.query.name,
      number: route.query.number,
      creator: route.query.creator
    })

    const comment = ref([])

    const getComment = async () => {
      let res = await Api.getComment(
        modelRef.value.type,
        modelRef.value.id,
        modelRef.value.limit,
        modelRef.value.offset
      )
      if (res.code == 200) {
        comment.value = res.comments
        console.log(comment.value)
      }
    }

    getComment()

    return {
      modelRef,
      comment,
      goBack
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
          margin-top: 0.32rem;

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
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
