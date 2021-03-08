/**
 * Created by mirari on 2017/4/10.
 */
export default {
  getMapScript () {
    if (!global.BMap) {
      const ak = 'DVr9V80HdBU5pjBWHyGMI2ei9nFuFbAc'
      global.BMap = {}
      global.BMap._preloader = new Promise((resolve, reject) => {
        global._initBaiduMap = function () {
          resolve(global.BMap)
          global.document.body.removeChild($script)
          global.BMap._preloader = null
          global._initBaiduMap = null
        }
        const $script = document.createElement('script')
        global.document.body.appendChild($script)
        $script.src = `//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=_initBaiduMap`
      })
      return global.BMap._preloader
    } else if (!global.BMap._preloader) {
      return Promise.resolve(global.BMap)
    } else {
      return global.BMap._preloader
    }
  }
}
