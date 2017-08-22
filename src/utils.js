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
