<template>
  <div class="out">
    <van-grid :column-num="3" class="songList" :border="false">
      <van-grid-item v-for="(item, index) in songList" :key="index" class="imageItem">
          <van-image
              width="2.7rem"
              height="2.7rem"
              radius="6px"
              fit="contain"
              position="top"
              lazy-load
              :src="`${item.coverImgUrl}?param=200y200`"
            />
            <div class="desc">{{ item.name.length < 13 ? item.name : item.name.slice(0,13)+"..." }}</div>
            <div class="playCount">
              <van-icon name="play-circle-o" />
              <span>{{ parseInt(item.playCount/10000) }}万</span>
            </div>
      </van-grid-item> 
    </van-grid>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import Api from '@/api/index.js'
export default defineComponent({
    name: 'threeColumn',
    setup() {
        const store = useStore()
        const tag = computed(() => store.state.tag)
        const songList = ref([])
        const getSongList = async (tag) => {
            let res = await Api.getSongList(tag)
            songList.value = res.playlists.slice(0,50)
        }
        watchEffect(() => getSongList(tag.value))
        
        return {
            getSongList,
            songList,
        }
    }
})
</script>

<style lang="scss" scoped>
.out{
  height: 500px;
  .songList {
    overflow: scroll;
      .imageItem {
        position: relative;
        .playCount {
          background-color: rgba(73, 72, 72, 0.5);
          height: 0.3733rem;
          padding: 0 0.16rem;
          border-radius: 0.2667rem;
          position: absolute;
          right: 0.3833rem;
          top: 0.5333rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        .desc {
          margin-top: 0.08rem;
          font-family:Arial, Helvetica, sans-serif;
          font-size: small;
          line-height: 0.3733rem;
          overflow: hidden;
          white-space: pre-wrap;
          transform: scale(0.9);
          letter-spacing: 1px;
        }
      }
    }
}
</style>