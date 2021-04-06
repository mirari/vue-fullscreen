type VueFullScreenOptions = {
  callback?: (fullscreen: boolean) => void;
  fullscreenClass?: string;
  wrap?: boolean;
  exitOnClickWrapper?: boolean;
  background?: string;
};

interface VueFullscreen {
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

export default VueFullscreen;
