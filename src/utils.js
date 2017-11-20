export function supportFullScreen () {
  const doc = document.documentElement

  return ('requestFullscreen' in doc) ||
    ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
    ('msRequestFullscreen' in doc && document.msFullscreenEnabled) ||
    ('webkitRequestFullScreen' in doc)
}

export function fullScreenStatus () {
  if (document.fullscreen ||
    document.mozFullScreen ||
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.webkitIsFullScreen) {
    return true
  } else {
    return false
  }
}

export function requestFullscreen (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else {
    console.log('Fullscreen API is not supported.')
  }
}

export function exitFullscreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else {
    console.log('Fullscreen API is not supported.')
  }
}

export function onFullScreenEvent (callback) {
  document.addEventListener('fullscreenchange', callback)
  document.addEventListener('mozfullscreenchange', callback)
  document.addEventListener('MSFullscreenChange', callback)
  document.addEventListener('webkitfullscreenchange', callback)
}

export function offFullScreenEvent (callback) {
  document.removeEventListener('fullscreenchange', callback)
  document.removeEventListener('mozfullscreenchange', callback)
  document.removeEventListener('MSFullscreenChange', callback)
  document.removeEventListener('webkitfullscreenchange', callback)
}

// 实现jquery对象继承，支持深拷贝
export function extend () {
  const extended = {}
  let deep = false
  let i = 0
  const length = arguments.length

  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0]
    i++
  }

  function merge (obj) {
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop])
        } else {
          extended[prop] = obj[prop]
        }
      }
    }
  }

  for (; i < length; i++) {
    var obj = arguments[i]
    merge(obj)
  }

  return extended
}
