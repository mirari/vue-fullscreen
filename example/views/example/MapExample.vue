<template>
  <div class="box">
    <fullscreen class="wrapper" @change="fullscreenChange" :fullscreen.sync="fullscreen" ref="fullscreen">
      <div class="map-container"></div>
      <div class="car-search"></div>
      <button type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen">
        <i class="mdi" :class="[fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen']"></i>
      </button>
    </fullscreen>
  </div>
</template>

<script>
import Fullscreen from 'src/components/Fullscreen'
import bmapLoader from './bmap-loader'
let BMap = null
let map = null
let $map = null

export default {
  components: {
    Fullscreen
  },

  data () {
    return {
      fullscreen: false
    }
  },

  methods: {
    toggleFullScreen () {
//      this.fullscreen = !this.fullscreen
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange (fullscreen) {
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
  .wrapper {
    position: relative;
    height: 400px;
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

  .car-search {
    position: absolute;
    top: 10px;
    left: 10px;
    max-height: calc(100% - 40px);
  }

  .map-container {
    height: 100%;
  }
</style>
