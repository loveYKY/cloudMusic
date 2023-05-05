<template>
    <div class="albumSonge-container">
        <!-- <header class="header" :style="{ backgroundColor: color }"> -->
        <van-sticky>
            <form action="/">
                <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
            </form>
        </van-sticky>
        <!-- </header> -->
        <!-- <van-skeleton title :row="3" style="margin-top: 1rem" :loading="loading"> -->
        <div class="songList">
            <div v-for="(item, index) in songList" :key="index" class="song-item" @click="playMusic(item)">
                <div class="index">{{ index + 1 }}</div>
                <div class="content">
                    <div class="alAndar">
                        <p class="van-ellipsis"><span>{{ item.name }}</span><span
                                style="color: rgb(167, 164, 164); margin-left: 4px">{{
                                    item.artists[0].name
                                }}</span></p>
                        <p>{{ item.album.name }}</p>
                    </div>
                    <div style="margin-right: 24px">
                        <van-icon name="play-circle-o" size="20" />
                    </div>
                </div>

            </div>
            <div class="footer"></div>
        </div>
        <!-- </van-skeleton> -->

    </div>
</template>
  
<script>
import { defineComponent, onMounted, onUnmounted, onUpdated, ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/index.js'
var _ = require('lodash')
import Store from '@/store'
export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const loading = ref(true)
        // const isShowList = ref(false)
        // const albumId = ref(route.query.id)
        // const albumDetail = ref({})
        const songList = ref([])

        const value = ref(Store.state.searchValue);
        const onSearch = async (val) => {
            await getSearchDetail(val)
            // isShowList.value = true
        };
        const onCancel = () => goBack();

        const goBack = () => {
            router.go(-1)
        }

        //获取歌单详情信息
        const getSearchDetail = async (val) => {
            let res = await Api.getSearch(val)
            if (res.code == 200) {
                // albumDetail.value = res.playlist
                songList.value = res.result.songs

                loading.value = false

            }
        }



        //滚动时修改header颜色
        const color = ref('rgba(255,255,255,0)')
        const changeHeaderColor = _.throttle(e => {
            if (e.target.scrollTop > 0) {
                color.value = 'rgba(0,0,0,0.2)'
            } else {
                color.value = 'rgba(255,255,255,0)'
            }
        }, 100)

        //给最外部盒子一个固定高度，使得页面可以滚动
        onMounted(() => {
            // console.log(value);
            getSearchDetail(value.value)
            let bodyHeight = document.querySelector('body').clientHeight

            document.querySelector('.albumSonge-container').style.height =
                bodyHeight + 'px'
        })

        onUnmounted(() => {
            Store.commit('changeSearchValue',value)
        })

        //单独音乐加入到播放列表，并播放
        const playMusic = item => {
            let obj = {
                al: {
                    id: item.album.id,
                    name: item.album.name,
                    pic: item.album.picId,
                    picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",

                },
                id: item.id,
                name: item.name,
                ar: item.artists[0]
            }
            Store.commit('updatePlayList', obj)
            document.getElementById('audio').autoplay = true
        }

        watch(value, cur => {
            getSearchDetail(cur)
        })





        return {
            goBack,
            getSearchDetail,
            // albumDetail,
            songList,
            loading,
            color,
            changeHeaderColor,

            playMusic,

            value,
            onSearch,
            onCancel,
        }
    }
})
</script>
  
<style lang="scss" scoped>
.albumSonge-container {
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    .header {
        color: #fff;
        box-sizing: border-box;
        position: fixed;
        width: 100%;
        // padding: 0.2133rem 0.2133rem;
        height: 0.8533rem;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    .cover {
        position: relative;
        padding-bottom: 0.32rem;

        .coverImg {
            height: 5.3333rem;
            width: 100%;
            background-size: 100%;
            background-repeat: no-repeat;
            filter: blur(100px);
            position: relative;
            border-radius: 0 0 80% 80%;
        }

        .detail {
            position: absolute;
            left: 50%;
            top: 1.6rem;
            transform: translate(-50%);
            display: flex;
            justify-content: flex-start;
            width: 100%;

            .image {
                margin-left: 0.32rem;
            }

            .desc {
                margin: 0 0.32rem;
                line-height: 0.5333rem;
                color: #fff;
                font-weight: bolder;
                font-size: 0.3733rem;

                .description {
                    margin-top: 0.32rem;
                    color: rgb(112, 111, 111);
                    font-weight: 400;
                    font-size: 0.32rem;
                }
            }
        }

        .buttonList {
            position: relative;
            height: 0.8533rem;
            text-align: center;

            :deep(.van-button) {
                border: none;
                border-right: 1px solid rgb(154, 150, 150);
                border-radius: 0;
                width: 2.3467rem;
                height: 0.8533rem;
            }

            & :deep(.van-button):nth-child(1) {
                border-radius: 0.8533rem 0 0 0.8533rem;
            }

            & :deep(.van-button):nth-child(3) {
                border-right: none;
                border-radius: 0 0.8533rem 0.8533rem 0;
            }
        }
    }

    .playAll {
        background-color: #fff;
        height: 1.28rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.32rem;
        z-index: 1000;

        &:active {
            background-color: rgb(190, 188, 188);
        }

        div {
            display: flex;
            align-items: center;
        }
    }

    .songList {
        .song-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &:active {
                background-color: rgb(190, 188, 188);
            }

            .index {
                height: 1.28rem;
                width: 1.28rem;
                text-align: center;
                line-height: 1.28rem;
                font-size: 0.3733rem;
                color: rgb(179, 178, 178);
            }

            .content {
                height: 1.28rem;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .alAndar {
                    width: 6.6667rem;

                    & p:nth-child(1) {
                        height: 0.4267rem;
                        line-height: 0.4267rem;
                        font-size: 0.3733rem;
                    }

                    & p:nth-child(2) {
                        margin-top: 0.1067rem;
                        color: rgb(167, 164, 164);
                    }
                }
            }
        }

        .footer {
            height: 1.28rem;
            width: 1.28rem;
        }
    }
}
</style>
  