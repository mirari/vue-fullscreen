<template>
  <div class="box">
    <div class="map-example" @change="fullscreenChange" :fullscreen.sync="fullscreen" ref="fullscreen">
      <div class="map-container"></div>
      <button type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen">
        <i class="mdi" :class="[fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen']"></i>
      </button>
    </div>
  </div>
</template>

<script>
import fullscreen from 'src'
import Vue from 'vue'
Vue.use(fullscreen)
import bmapLoader from './bmap-loader'
let BMap = null
let map = null
let $map = null

export default {

  data () {
    return {
      fullscreen: false
    }
  },

  methods: {
    toggleFullScreen () {
//      this.fullscreen = !this.fullscreen
//      this.$refs['fullscreen'].toggle()

      this.$fullscreen.toggle(this.$el.querySelector('.map-example'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      map.checkResize()
      map.setMapStyle({style: fullscreen ? 'bluish' : 'normal'})
    }
  },

  mounted: function () {
    bmapLoader.getMapScript().then((module) => {
      BMap = module
      $map = this.$el.querySelector('.map-container')
      map = new BMap.Map($map)
      map.enableKeyboard()
      map.enableScrollWheelZoom()
      map.centerAndZoom('杭州', 13)
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .map-example {
    position: relative;
    height: 400px;

    .map-container {
      height: 100%;
    }

    .btn-map-fullscreen {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 36px;
      height: 36px;
      padding: 0;
      font-size: 36px;
      line-height: 36px;
      text-align: center;
      outline: none;
    }

    &.fullscreen {
      width: 100%;
      height: 100%;
    }
  }
</style>
