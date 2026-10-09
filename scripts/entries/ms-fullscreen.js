import screenfull from 'screenfull'

// IE returns void and reports request failures through MSFullscreenError.
// Convert both success and failure events to settled promises.
if (
  typeof document !== 'undefined' &&
  screenfull.raw?.requestFullscreen === 'msRequestFullscreen'
) {
  const invoke = (target, method, completed) =>
    new Promise((resolve, reject) => {
      const cleanup = () => {
        screenfull.off('change', changed)
        screenfull.off('error', failed)
      }
      const changed = () => {
        if (completed()) {
          cleanup()
          resolve()
        }
      }
      const failed = () => {
        cleanup()
        reject(new Error('IE fullscreen request failed'))
      }
      screenfull.on('change', changed)
      screenfull.on('error', failed)
      try {
        target[method]()
      } catch (error) {
        cleanup()
        reject(error)
      }
    })
  screenfull.request = (element = document.documentElement) =>
    invoke(
      element,
      screenfull.raw.requestFullscreen,
      () => screenfull.element === element,
    )
  screenfull.exit = () =>
    screenfull.isFullscreen
      ? invoke(
          document,
          screenfull.raw.exitFullscreen,
          () => !screenfull.isFullscreen,
        )
      : Promise.resolve()
}
