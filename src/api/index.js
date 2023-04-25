import { request } from './helper'

//main

//游客登陆
const getAnonimousCookie = () => {
  return request('get', '/register/anonimous')
}
const loginRefresh = () => {
  return request('get', '/login/refresh')
}

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

const getSongList = tag => {
  return request('get', '/top/playlist/highquality?cat=' + tag)
}

const getAlbumDetail = id => {
  return request('get', `/playlist/detail?id=${id}`)
}

const getSongDetail = ids => {
  return request('get', `/song/detail?ids=${ids}`)
}

const getLyric = id => {
  return request('get', `/lyric?id=${id}`)
}

const getComment = (type, id, limit, offset) => {
  return request(
    'get',
    `/comment/${type}?id=${id}&limit=${limit}&offset=${offset}`
  )
}

const getDigitDetail = id => {
  return request('get', `/album/detail?id=${id}`)
}

export default {
  getAnonimousCookie,
  loginRefresh,
  getSwiper,
  getRecommendSongList,
  getRankingList,
  getAlbumList,
  getSongList,
  getAlbumDetail,
  getSongDetail,
  getLyric,
  getComment,
  getDigitDetail
}
