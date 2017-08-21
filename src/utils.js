export function supportFullScreen () {
  const doc = document.documentElement

  return ('requestFullscreen' in doc) ||
    ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
    ('webkitRequestFullScreen' in doc)
}

export function fullScreenStatus () {
  return document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    false
}

export function requestFullScreen (el) {
  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
  } else if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(global.Element.ALLOW_KEYBOARD_INPUT)
  }
}

export function cancelFullScreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  }
}

export function onFullScreenEvent (callback) {
  document.addEventListener('fullscreenchange', callback)
  document.addEventListener('mozfullscreenchange', callback)
  document.addEventListener('webkitfullscreenchange', callback)
}

export function offFullScreenEvent (callback) {
  document.removeEventListener('fullscreenchange', callback)
  document.removeEventListener('mozfullscreenchange', callback)
  document.removeEventListener('webkitfullscreenchange', callback)
}
