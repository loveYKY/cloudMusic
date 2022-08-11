<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="{ height: '80%' }"
    class="reply-container"
  >
    <header class="header">
      <div class="header-left">
        <van-icon name="down" class="back" size="20" @click="show = false" />
        <div
          >回复<span
            style="margin-left: 4px"
            v-if="replyDetail.beReplied.length != 0"
            >({{ replyDetail.beReplied.length }})</span
          ></div
        >
      </div>
    </header>

    <div class="reply-comment">
      <div class="main-comment-item">
        <img :src="`${replyDetail.user.avatarUrl}?param=30y30`" />
        <div class="comment-item-detail">
          <p class="detail-nickname">{{ replyDetail.user.nickname }}</p>
          <p class="detail-time">{{ replyDetail.timeStr }}</p>
          <p class="detail-comment">{{ replyDetail.content }}</p>
        </div>
      </div>

      <div
        style="height: 24px; padding: 0.2133rem 0.2133rem; line-height: 24px"
      >
        <span>全部回复</span>
      </div>
      <template v-for="(item, index) in replyDetail.beReplied" :key="index">
        <div class="reply-comment-item">
          <img :src="`${item.user.avatarUrl}?param=30y30`" />
          <div class="comment-item-detail">
            <p class="detail-nickname">{{ item.user.nickname }}</p>
            <p class="detail-time">{{ replyDetail.timeStr }}</p>
            <p class="detail-comment">{{ item.content }}</p>
          </div>
        </div>
      </template>
    </div>
  </van-popup>
</template>

<script>
import { computed, defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
  props: {
    showReply: {
      type: Boolean,
      required: true
    },
    replyDetail: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:showReply'],
  setup(props, context) {
    const { showReply, replyDetail } = toRefs(props)

    const show = computed({
      get: function () {
        return showReply.value
      },
      set: function (val) {
        context.emit('update:showReply', val)
      }
    })

    return {
      show,
      replyDetail
    }
  }
})
</script>

<style lang="scss">
.reply-container {
  border-radius: 12px 12px 0px 0px;
  .header {
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 0.2133rem 0.2133rem;
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
      div {
        margin-left: 0.32rem;
        font-size: 0.3733rem;
      }
    }
  }

  .reply-comment {
    .main-comment-item {
      display: flex;
      justify-content: flex-start;
      padding: 0.32rem 0.32rem 0rem 0.32rem;
      border-bottom: 4px solid #ebe6e6;
      img {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 0.8rem;
      }
      .comment-item-detail {
        flex: 1;
        margin-left: 0.32rem;
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
    .reply-comment-item {
      display: flex;
      justify-content: flex-start;
      padding: 0.32rem 0 0 0.32rem;
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
</style>
