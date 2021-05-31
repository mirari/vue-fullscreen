import screenfull, { Screenfull } from 'screenfull'
import { assign } from './util'

const sf = <Screenfull>screenfull

interface ApiOptions {
  callback?: (fullscreen: boolean) => void
  fullscreenClass?: string
  teleport?: boolean
}

class VueFullscreenApiOptions {
  callback?: (fullscreen: boolean) => void
  fullscreenClass = 'fullscreen'
  teleport = false
  constructor(options?: ApiOptions) {
    if (options) {
      assign(this, options)
    }
  }
}

interface VueFullscreenApi {
  /**
   * Attempts to toggle fullscreen using the target element
   *
   * @param target - Target element to enter fullscreen, defaults to `document.body`
   * @param options - The fullscreen options
   * @param force - `true` to force enter, `false` to exit fullscreen
   */
  toggle(
    target?: Element,
    options?: ApiOptions,
    force?: boolean | undefined
  ): Promise<void>

  /**
   * Attempts to enter fullscreen using the target element
   *
   * @param target - Target element to enter fullscreen, defaults to `document.body`
   * @param options - The fullscreen options
   */
  request(target?: Element, options?: ApiOptions): Promise<void>
  /**
   * Exits fullscreen
   */
  exit(): Promise<void>
  /**
   * Gets the fullscreen state
   */
  isFullscreen: boolean
  /**
   * Check browser support for the fullscreen API
   */
  isEnabled: boolean
}

const api: VueFullscreenApi = {
  isFullscreen: false,
  isEnabled: true,
  toggle(target?: Element,
    options?: ApiOptions,
    force?: boolean | undefined) {
    if (force === undefined) {
      // 如果已经是全屏状态，则退出
      return !sf.isFullscreen ? this.request(target, options) : this.exit()
    }
    else {
      return force ? this.request(target, options) : this.exit()
    }
  },
  request(target?: Element, options?: ApiOptions) {
    if (sf.isFullscreen) {
      return Promise.resolve()
    }
    if (!target) {
      target = document.body
    }
    const currentOptions = new VueFullscreenApiOptions(options)

    if (target === document.body) {
      currentOptions.teleport = false
    }

    // 添加全屏class
    target.classList.add(currentOptions.fullscreenClass)

    let token: Comment
    const parentNode = target.parentNode
    if (currentOptions.teleport) {
      token = document.createComment('fullscreen-token')
      parentNode!.insertBefore(token, target)
      document.body.appendChild(target)
    }

    // 全屏api事件回调
    const fullScreenCallback = () => {
      if (!sf.isFullscreen) {
        // 退出全屏时解绑回调
        sf.off('change', fullScreenCallback)

        target?.classList.remove(currentOptions.fullscreenClass)

        if (currentOptions.teleport) {
          parentNode!.insertBefore(target!, token)
          parentNode!.removeChild(token)
        }
      }
      if (currentOptions.callback) {
        currentOptions.callback(sf.isFullscreen)
      }
    }
    sf.on('change', fullScreenCallback)

    return sf.request(target)
  },
  exit() {
    if (!sf.isFullscreen) {
      return Promise.resolve()
    }
    return sf.exit()
  },
}

Object.defineProperties(api, {
  isFullscreen: {
    get() {
      return sf.isFullscreen
    },
  },
  element: {
    enumerable: true,
    get() {
      return sf.element
    },
  },
  isEnabled: {
    enumerable: true,
    get() {
      return sf.isEnabled
    },
  },
})

export default api
