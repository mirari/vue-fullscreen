import { App } from 'vue'
import type { DefineComponent } from 'vue'
import type screenfull from 'screenfull'

declare namespace VueFullscreen {
  export interface InstallationOptions {
    name?: string
  }

  export interface ApiOptions {
    callback?: (fullscreen: boolean) => void
    fullscreenClass?: string
    teleport?: boolean
    pageOnly?: boolean
  }

  export interface VueFullscreenApi {
    /**
     * Attempts to toggle fullscreen using the target element
     *
     * @param target - Target element to enter fullscreen, defaults to `document.body`
     * @param options - The fullscreen options
     * @param force - `true` to force enter, `false` to exit fullscreen
     */
    toggle(
      target?: Element,
      options?: VueFullscreen.ApiOptions,
      force?: boolean | undefined
    ): Promise<void>

    /**
     * Attempts to enter fullscreen using the target element
     *
     * @param target - Target element to enter fullscreen, defaults to `document.body`
     * @param options - The fullscreen options
     */
    request(target?: Element, options?: VueFullscreen.ApiOptions): Promise<void>
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

  export function install(app: App, options?: InstallationOptions): void
}
export type Screenfull = screenfull.Screenfull
export type api = VueFullscreen.VueFullscreenApi
export type component = DefineComponent<{}, {}, any>

export default VueFullscreen
