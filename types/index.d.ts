import { App } from 'vue'
import Screenfull from 'screenfull'
import type { Directive, DefineComponent } from 'vue'

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
      target?: Element | null,
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

export declare const screenfull: typeof Screenfull

export declare const api: VueFullscreen.VueFullscreenApi

export declare const component: DefineComponent<{}, {}, any>

export declare const directive: Directive

export default VueFullscreen

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $fullscreen: VueFullscreen.VueFullscreenApi
  }
}
