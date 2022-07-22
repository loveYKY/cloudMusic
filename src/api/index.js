import { request } from './helper'

//main
const getSwiper = () => {
  return request('get', '/banner')
}

const getRecommendSongList = () => {
  return request('get', '/personalized')
}

const getRankingList = () => {
  return request('get', '/toplist/detail')
}

const getAlbumList = () => {
  return request('get', '/album/list?limit=18')
}

const getAlbumDetail = id => {
  return request('get', `/playlist/detail?id=${id}`)
}

const getSongDetail = ids => {
  return request('get', `/song/detail?ids=${ids}`)
}

export default {
  getSwiper,
  getRecommendSongList,
  getRankingList,
  getAlbumList,
  getAlbumDetail,
  getSongDetail
}
