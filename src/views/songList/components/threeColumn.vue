<template>
    <div class="out" v-if="!loading">
      <lazy-component>
        <van-grid :column-num="3" class="songList" :border="false">
          <van-grid-item 
            v-for="(item, index) in songList" 
            :key="index" 
            class="imageItem"
            @click="goToDetail(item.id)"
          >
              <van-image
                  width="2.8rem"
                  height="2.8rem"
                  radius="6px"
                  fit="contain"
                  position="top"
                  lazy-load
                  :src="`${item.coverImgUrl}?param=200y200`"
                />
                <div class="desc">{{ item.name.length < 13 ? item.name : item.name.slice(0,10)+"..." }}</div>
                <div class="playCount">
                  <van-icon name="play-circle-o" />
                  <span>{{ parseInt(item.playCount/10000) }}万</span>
                </div>
          </van-grid-item> 
        </van-grid>
      </lazy-component>
    </div>
    <div class="out2" v-else>
      <van-loading size="44px" vertical>加载中...</van-loading>
    </div>
</template>

<script>
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Api from '@/api/index.js'
export default defineComponent({
    name: 'threeColumn',
    setup() {
        const router = useRouter()
        const store = useStore()
        const tag = computed(() => store.state.tag)
        const songList = ref([])
        const loading = ref(true)
        const getSongList = async (tag) => {
            loading.value = true
            let res = await Api.getSongList(tag)
            songList.value = res.playlists.slice(0,50)
            loading.value = false
        }
        watchEffect(() => getSongList(tag.value))

        const goToDetail = id => {
          router.push({
            path: '/albumSong',
            query: {
              id: id
            }
          })
        }
        
        return {
            getSongList,
            goToDetail,
            songList,
            loading,
        }
    }
})
</script>

<style lang="scss" scoped>
.out{
  height: 600px;
  overflow: auto;
  .songList {
    
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
          font-size: 15px;
          line-height: 0.3733rem;
          overflow: hidden;
          white-space: pre-wrap;
          transform: scale(0.9);
          letter-spacing: 1px;
        }
      }
    }
}
.out2 {
  margin-top: 40%;
}
</style>