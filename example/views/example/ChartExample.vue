<template>
  <div class="box">
    <fullscreen class="wrapper" @change="fullscreenChange" :fullscreen.sync="fullscreen" ref="fullscreen" background="#EEE">
      <div class="chart-container"></div>
      <button type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen">
        <i class="mdi" :class="[fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen']"></i>
      </button>
    </fullscreen>
  </div>
</template>

<script>
import Fullscreen from 'src/component.vue'
import echarts from 'echarts'

let chart = null
let $chart = null

let xAxisData = []
let data1 = []
let data2 = []
let data3 = []
let data4 = []

for (let i = 0; i < 10; i++) {
  xAxisData.push('Class' + i)
  data1.push((Math.random() * 2).toFixed(2))
  data2.push(-Math.random().toFixed(2))
  data3.push((Math.random() * 5).toFixed(2))
  data4.push((Math.random() + 0.3).toFixed(2))
}

let itemStyle = {
  normal: {
  },
  emphasis: {
    barBorderWidth: 1,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0,0,0,0.5)'
  }
}

let option = {
  legend: {
    data: ['bar', 'bar2', 'bar3', 'bar4'],
    align: 'left',
    left: 10
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      dataView: {}
    }
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    name: 'X Axis',
    silent: false,
    axisLine: {onZero: true},
    splitLine: {show: false},
    splitArea: {show: false}
  },
  yAxis: {
    inverse: true,
    splitArea: {show: false}
  },
  grid: {
    left: 100
  },
  visualMap: {
    type: 'continuous',
    dimension: 1,
    text: ['High', 'Low'],
    inverse: true,
    itemHeight: 200,
    calculable: true,
    min: -2,
    max: 6,
    top: 60,
    left: 10,
    inRange: {
      colorLightness: [0.4, 0.8]
    },
    outOfRange: {
      color: '#bbb'
    },
    controller: {
      inRange: {
        color: '#2f4554'
      }
    }
  },
  series: [
    {
      name: 'bar',
      type: 'bar',
      stack: 'one',
      itemStyle: itemStyle,
      data: data1
    },
    {
      name: 'bar2',
      type: 'bar',
      stack: 'one',
      itemStyle: itemStyle,
      data: data2
    },
    {
      name: 'bar3',
      type: 'bar',
      stack: 'two',
      itemStyle: itemStyle,
      data: data3
    },
    {
      name: 'bar4',
      type: 'bar',
      stack: 'two',
      itemStyle: itemStyle,
      data: data4
    }
  ]
}

export default {
  components: {
    Fullscreen
  },

  data () {
    return {
      fullscreen: false
    }
  },

  computed: {
  },

  methods: {
    toggleFullScreen () {
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange (fullscreen) {
/*
      chart.dispose()
      if (fullscreen) {
        chart = echarts.init($chart, 'dark')
        chart.setOption(option)
      } else {
        chart = echarts.init($chart)
        chart.setOption(option)
      }
*/
      this.$nextTick(() => {
        chart.resize()
      })
    }
  },

  mounted: function () {
    $chart = this.$el.querySelector('.chart-container')
    chart = echarts.init($chart)
    chart.setOption(option)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .wrapper {
    position: relative;
    height: 400px;

    .chart-container {
      height: 100%;
      width: 100%;
    }

    .btn-map-fullscreen {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 36px;
      height: 36px;
      padding: 0;
      font-size: 36px;
      line-height: 36px;
      text-align: center;
      outline: none;
    }

    &.fullscreen {
      display: flex;
      justify-content: center;
      align-items: center;

      .chart-container {
        height: 60%;
        width: 60%;
      }

      .btn-map-fullscreen {
        left: 10px;
        top: 10px;
        right: auto;
        bottom: auto;
      }
    }
  }
</style>
