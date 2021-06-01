import screenfull, { Screenfull } from 'screenfull'
import { assign } from './util'

const sf = screenfull as Screenfull

interface ApiOptions {
  callback?: (fullscreen: boolean) => void
  fullscreenClass?: string
  teleport?: boolean
  pageOnly?: boolean
}

class VueFullscreenApiOptions {
  callback?: (fullscreen: boolean) => void
  fullscreenClass = 'fullscreen'
  teleport = false
  pageOnly = false
  constructor(options?: ApiOptions) {
    if (options) {
      assign(this, options)
    }
  }
}

interface VueFullscreenApi {
  options: VueFullscreenApiOptions
  element: Element | null
  toggle(
    target?: Element,
    options?: ApiOptions,
    force?: boolean | undefined
  ): Promise<void>
  request(target?: Element, options?: ApiOptions): Promise<void>
  exit(): Promise<void>
  isFullscreen: boolean
  isEnabled: boolean
}

interface FullscreenStyle {
  position: string
  left: string
  top: string
  width: string
  height: string
}

let token: Comment
let parentNode: (Node & ParentNode) | null

function setStyle(element: Element, style: FullscreenStyle) {
  element.style.position = style.position
  element.style.left = style.left
  element.style.top = style.top
  element.style.width = style.width
  element.style.height = style.height
}

function resetElement(api: VueFullscreenApi) {
  const target = api.element
  if (target) {
    // 移除全屏class
    target.classList.remove(api.options.fullscreenClass)

    if (api.options.teleport || api.options.pageOnly) {
      if (api.options.teleport && parentNode) {
        // 还原位置
        parentNode.insertBefore(target, token)
        parentNode.removeChild(token)
      }
      // 移除样式
      if (target.__styleCache) {
        setStyle(target, target.__styleCache)
      }
    }
  }
}

const api: VueFullscreenApi = {
  options: new VueFullscreenApiOptions(),
  element: null,
  isFullscreen: false,
  isEnabled: sf.isEnabled,
  toggle(target?: Element,
    options?: ApiOptions,
    force?: boolean | undefined) {
    if (force === undefined) {
      // 如果已经是全屏状态，则退出
      return !this.isFullscreen ? this.request(target, options) : this.exit()
    }
    else {
      return force ? this.request(target, options) : this.exit()
    }
  },
  request(target?: Element, options?: ApiOptions) {
    if (this.isFullscreen) {
      return Promise.resolve()
    }
    // 默认全屏对象为body
    if (!target) {
      target = document.body
    }
    this.options = new VueFullscreenApiOptions(options)

    // body不可teleport
    if (target === document.body) {
      this.options.teleport = false
    }
    // 不支持全屏api则自动启用网页全屏
    if (!sf.isEnabled) {
      this.options.pageOnly = true
    }
    // 添加全屏class
    target.classList.add(this.options.fullscreenClass)
    // teleport或者网页全屏时，为目标元素添加全屏样式
    if (this.options.teleport || this.options.pageOnly) {
      const { position, left, top, width, height } = target.style
      target.__styleCache = { position, left, top, width, height }
      setStyle(target, {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
      })
    }
    // teleport：将目标元素挪到body下，并在原地留一个标记用于还原
    if (this.options.teleport) {
      parentNode = target.parentNode
      if (parentNode) {
        token = document.createComment('fullscreen-token')
        parentNode.insertBefore(token, target)
        document.body.appendChild(target)
      }
    }
    if (this.options.pageOnly) {
      // 网页全屏模式
      // 按键回调
      const keypressCallback = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          document.removeEventListener('keyup', keypressCallback)
          this.exit()
        }
      }
      this.isFullscreen = true
      this.element = target
      document.removeEventListener('keyup', keypressCallback)
      document.addEventListener('keyup', keypressCallback)
      if (this.options.callback) {
        this.options.callback(this.isFullscreen)
      }
      return Promise.resolve()
    }
    else {
      // 全屏api模式
      // 全屏api事件回调
      const fullScreenCallback = () => {
        if (!sf.isFullscreen) {
          // 退出全屏时解绑回调
          sf.off('change', fullScreenCallback)
          resetElement(this)
        }
        this.isFullscreen = sf.isFullscreen
        if (!this.options.teleport) {
          this.element = sf.element
        }
        else {
          this.element = target || null
        }
        if (this.options.callback) {
          this.options.callback(sf.isFullscreen)
        }
      }
      sf.on('change', fullScreenCallback)

      return sf.request(this.options.teleport ? document.body : target)
    }
  },
  exit() {
    if (!this.isFullscreen) {
      return Promise.resolve()
    }
    if (this.options.pageOnly) {
      resetElement(this)
      this.isFullscreen = false
      this.element = null
      if (this.options.callback) {
        this.options.callback(this.isFullscreen)
      }
      return Promise.resolve()
    }
    else {
      return sf.exit()
    }
  },
}

export default api
