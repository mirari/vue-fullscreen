import Vue from "vue";

type VueFullScreenOptions = {
  callback?: (fullscreen: boolean) => void;
  fullscreenClass?: string;
  wrap?: boolean;
  exitOnClickWrapper?: boolean;
  background?: string;
};
declare class VueFullscreen {
  toggle(
    target: Element,
    options?: VueFullScreenOptions,
    force?: boolean | undefined
  ): void;
  enter(target: Element, options?: VueFullScreenOptions): void;
  exit(): void;
  getState(): boolean;
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
