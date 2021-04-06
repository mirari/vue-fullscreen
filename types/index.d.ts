import Vue from "vue";

type VueFullScreenOptions = {
  callback?: (fullscreen: boolean) => void;
  fullscreenClass?: string;
  wrap?: boolean;
  exitOnClickWrapper?: boolean;
  background?: string;
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
  enter(target?: Element, options?: VueFullScreenOptions): void;
  /**
   * Exits fullscreen
   */
  exit(): void;
  /**
   * Gets the fullscreen state
   */
  getState(): boolean;
  /**
   * Check browser support for the fullscreen API
   */
  support: boolean;
}

declare namespace VueFullscreenPlugin {
  export interface InstallationOptions {
    name: string;
  }

  export function install(vue: typeof Vue, options?: InstallationOptions): void;
}

export default VueFullscreenPlugin;

declare module "vue/types/vue" {
  interface Vue {
    $fullscreen: VueFullscreen;
  }
}
