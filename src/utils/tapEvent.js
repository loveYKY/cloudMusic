var bindTapEvent = function (dom, callback) {
  var isMove = false //是否滑动
  var startTime = 0 //点触开始时间

  dom.addEventListener('touchstart', function (e) {
    startTime = Date.now()
  })

  dom.addEventListener('touchmove', function (e) {
    isMove = true
  })

  dom.addEventListener('touchend', function (e) {
    //时间小于150ms，并且没有滑动才认为是点触事件
    if (Date.now() - startTime < 150 && !isMove) {
      callback && callback.call(this, e)
    }
  })
}

export { bindTapEvent as tabEvent }
