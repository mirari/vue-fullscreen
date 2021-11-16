import Vue from 'vue'
import Screenfull from 'screenfull'
import type { DirectiveOptions, Component } from 'vue'

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
    /**
     * @deprecated
     * Alias of request
     */
    enter(target?: Element, options?: VueFullscreen.ApiOptions): Promise<void>
    /**
     * @deprecated
     * Alias of isEnabled
     */
    support: boolean
    /**
     * @deprecated
     * Gets the fullscreen state
     */
    getState(): boolean
  }

  export function install(app: typeof Vue, options?: InstallationOptions): void
}

export declare const screenfull: typeof Screenfull

export declare const api: VueFullscreen.VueFullscreenApi

export declare const component: Component

export declare const directive: DirectiveOptions

export default VueFullscreen

declare module "vue/types/vue" {
  interface Vue {
    $fullscreen: typeof api;
  }
}
