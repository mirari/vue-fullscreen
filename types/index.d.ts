import Vue from 'vue'
import type screenfull from 'screenfull'
import type { Component } from 'vue'

type VueFullScreenOptions = {
  callback?: (fullscreen: boolean) => void;
  fullscreenClass?: string;
  teleport?: boolean;
  pageOnly?: boolean;
};
declare class VueFullscreen {
  /**
   * Attempts to toggle fullscreen using the target element
   *
   * @param target - Target element to enter fullscreen, defaults to `document.body`
   * @param options - The fullscreen options
   * @param force - `true` to force enter, `false` to exit fullscreen
   */
  toggle(
    target?: Element,
    options?: VueFullScreenOptions,
    force?: boolean | undefined
  ): void;
  /**
   * Attempts to enter fullscreen using the target element
   *
   * @param target - Target element to enter fullscreen, defaults to `document.body`
   * @param options - The fullscreen options
   */
  request(target?: Element, options?: VueFullScreenOptions): void;
  /**
   * Exits fullscreen
   */
  exit(): void;
  /**
   * Gets the fullscreen state
   */
  isFullscreen: boolean;
  /**
   * Check browser support for the fullscreen API
   */
  isEnabled: boolean;
}

declare namespace VueFullscreenPlugin {
  export interface InstallationOptions {
    name: string;
  }

  export function install(vue: Vue, options?: InstallationOptions): void;
}

export default VueFullscreenPlugin;

export type Screenfull = screenfull.Screenfull
export type api = VueFullScreenOptions
export type component = Component

declare module "vue/types/vue" {
  interface Vue {
    $fullscreen: VueFullscreen;
  }
}
