<template>
  <div class="lyric-container" @click="close">
    <div class="content" v-if="control">
      <template v-for="(item, index) in lyric" :key="index">
        <p
          v-if="item.font.length != 0"
          class="lyric"
          :class="{
            active: currentLyricIndex == index
          }"
        >
          {{ item.font }}
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, watch, ref, computed, onMounted } from 'vue'
import Store from '@/store'
import Api from '@/api/index.js'
export default defineComponent({
  props: {
    musicId: {
      require: true
    }
  },
  emits:['closeLyric'],
  setup(props, context) {
    const { musicId } = toRefs(props)
    //歌词数组
    const lyric = ref([])
    //控制是否渲染
    const control = ref(true)
    const getLyric = async () => {
      let res = await Api.getLyric(musicId.value)
      lyric.value = res.lrc.lyric.split(/[(\r\n)\r\n]+/).map(item => {
        let min = item.slice(1, 3)
        let sec = item.slice(4, 6)
        let ms = item.slice(7, 9)
        let index = item.indexOf(']')
        let font = item.slice(index + 1)
        let time = Number(sec) + Number(min) * 60 + Number(0 + '.' + ms)
        return {
          font: font,
          time: time
        }
      })
      control.value = true
    }
    //当前播放时间
    const currentTime = computed({
      get: function () {
        return Store.state.currentTime.toFixed(2)
      }
    })

    //当前播放的歌词
    const currentLyricIndex = computed({
      get: function () {
        return lyric.value.findIndex((item, index) => {
          return (
            lyric.value[index]?.time <= currentTime.value &&
            lyric.value[index + 1]?.time > currentTime.value
          )
        })
      }
    })

    //获取歌词元素高度
    const lyricHeight = ref(0)
    onMounted(() => {
      let fontSize = document.querySelector('html').style.fontSize
      lyricHeight.value = fontSize.split('px')[0] * 0.8533
    })

    //当歌词位置改变，滚动
    watch(currentLyricIndex, () => {
      let currentTop = document.querySelector('.lyric-container').scrollTop

      document
        .querySelector('.lyric-container')
        .scrollTo({ top: lyricHeight.value + currentTop, behavior: 'smooth' })
    })

    watch(
      musicId,
      () => {
        control.value = false
        getLyric()

        //初始化歌词滚动高度
        let dom = document.querySelector('.lyric-container')
        if (dom) {
          dom.scrollTop = 0
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    const close = ()=>{
        context.emit('closeLyric')
    }
    return {
      control,
      musicId,
      lyric,
      currentTime,
      currentLyricIndex,
      close
    }
  }
})
</script>

<style lang="scss" scoped>
.lyric-container {
  height: calc(100vh - 2.5rem - 4rem);
  margin: 1rem auto 0;
  text-align: center;
  overflow: auto;
  .content {
    transform: translateY(30vh);
  }
  &::-webkit-scrollbar {    
    display: none;
  }
  .lyric {
    transition: all 0.1s linear;
    height: 0.8533rem;
    color: rgb(65, 65, 65);
  }
  .active {
    color: #fff;
  }
}
</style>
