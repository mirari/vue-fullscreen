import {
  extend,
  supportFullScreen,
  fullScreenStatus,
  requestFullscreen,
  exitFullscreen,
  onFullScreenEvent,
  offFullScreenEvent
} from './utils'

const defaults = {
  wrap: true,
  background: '#333',
  callback: () => {},
  fullscreenClass: 'fullscreen'
}

const support = supportFullScreen()

function getState () {
  return fullScreenStatus()
}

function toggle (target, options, force) {
  if (!support) {
    return
  }
  if (force === undefined) {
    // 如果已经是全屏状态，则退出
    !getState() ? enter(target, options) : exit()
  } else {
    force ? enter(target, options) : exit()
  }
}

function enter (target = document.body, options) {
  if (!support) {
    return
  }
  if (getState()) {
    return
  }
  options = extend(true, {}, defaults, options)

  const el = target
  let wrapper
  if (options.wrap) {
    wrapper = document.createElement('div')
    wrapper.style['overflow-y'] = 'auto'
    wrapper.style['background'] = options.background
    wrapper.style['width'] = '100%'
    wrapper.style['height'] = '100%'

    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
    wrapper.addEventListener('click', function (event) {
      if (event.target === this) {
        exitFullscreen()
      }
    })
  }

  el.classList.add(options.fullscreenClass)

  function fullScreenCallback () {
    const isFullscreen = getState()
    if (!isFullscreen) {
      // 退出全屏时解绑回调
      offFullScreenEvent(fullScreenCallback)

      el.classList.remove(options.fullscreenClass)

      if (options.wrap) {
        wrapper.parentNode.insertBefore(el, wrapper)
        wrapper.parentNode.removeChild(wrapper)
      }
    }

    if (options.callback) {
      options.callback(isFullscreen)
    }
  }

  onFullScreenEvent(fullScreenCallback)
  requestFullscreen(options.wrap ? wrapper : el)
}

function exit () {
  if (!support) {
    return
  }
  if (!getState()) {
    return
  }
  exitFullscreen()
}

export default {
  getState,
  toggle,
  enter,
  exit
}
