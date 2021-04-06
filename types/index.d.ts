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

export declare function install(vue: typeof Vue, url: string): void;
declare module "vue/types/vue" {
  interface Vue {
    $fullscreen: VueFullscreen;
  }
}
