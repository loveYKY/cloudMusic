<template>
  <van-popup v-model:show="show" position="left" :style="{ height: '100%', backgroundColor: '#dcdcdc' }" class="out">
    <div class="leftPopup-container">
        <van-cell-group inset class="cell">
          <van-cell >
            <van-icon name="chat-o" dot /><span class="word">消息中心</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="shop-o" /><span class="word">云贝中心</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="bulb-o" /><span class="word">创作者中心</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
        </van-cell-group>

        <van-cell-group inset class="cell">
          <van-cell >
            <span class="word-title">音乐服务</span>
          </van-cell>
          <van-cell >
            <van-icon name="coupon-o" /><span class="word">云村有票</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="shopping-cart-o" /><span class="word">商城</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="service-o" /><span class="word">Beat专区</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="phone-o" /><span class="word">口袋彩铃</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="tv-o" /><span class="word">游戏专区</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
        </van-cell-group>

        <van-cell-group inset class="cell">
          <van-cell >
            <span class="word-title">其他</span>
          </van-cell>
          <van-cell >
            <van-icon name="edit" /><span class="word">设置</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="closed-eye" /><span class="word">定时关闭</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="service-o" /><span class="word">个性装扮</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="phone-o" /><span class="word">边听边存</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="close" /><span class="word">音乐黑名单</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="shield-o" /><span class="word">青少年模式</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
          <van-cell >
            <van-icon name="phone-circle-o" /><span class="word">音乐闹钟</span>
            <van-icon class="arrow" name="arrow" />
          </van-cell>
        </van-cell-group>

        <van-cell-group inset class="cell-last">
          <van-cell >
            <span class="word-last">退出登录</span>
          </van-cell>
        </van-cell-group>

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
.out {
  .leftPopup-container {
    width: 80vw;
    .cell {
      margin: 0.5rem;
      .word-title {
        color: rgba(0,0,0,0.4);
        font-size: 3px;
      }
      
      .word {
        padding-left: 0.2rem;
      }
      .arrow {
        float: right;
        color: rgba(0,0,0,0.3);
      }
    }
    .cell-last {
      margin: 0.5rem;
      margin-bottom: 2rem;
      .word-last {
        color: red;
        margin-left: 36%;
        font-size: 15px;
      }
    }
}
}


</style>
