export default {
  updatePlayList: (state, val) => {
    let index = state.playList.findIndex(item => {
      return item.id == val.id
    })
    if (index != -1) {
      state.playIndex = index
    } else {
      state.playList.unshift(val)
      state.playIndex = 0
    }
    state.playControl = true
  },
  changeIndex: state => {
    if (state.playIndex < state.playList.length - 1) {
      state.playIndex++
    } else {
      state.playControl = false
    }
  },
  changeControl: (state, val) => {
    state.playControl = !state.playControl
  },
  beforeSong: state => {
    if (state.playIndex > 0) {
      state.playIndex--
    } else {
      state.playControl = false
    }
  }
}
