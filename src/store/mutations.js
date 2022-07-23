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
  changeControl: (state, val) => {
    state.playControl = !state.playControl
  }
}
