export default {
  changeTag(state, data) {
    state.tag = data
  },
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
  updatePlayListAll: (state, val) => {
    for (let i = val.length-1; i > 0; i--) {
      let index = state.playList.findIndex(item => {
        return item.id == val[i].id
      })
      if (index == -1) {
        state.playList.unshift(val[i])
      }
    }
    state.playIndex = 0
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
  },
  timeupdate: (state, val) => {
    state.currentTime = val
  },
  changeSearchValue: (state, val) => {
    state.searchValue = val
  }
}
