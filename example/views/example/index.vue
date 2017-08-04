<template>
  <div>
    <h1 class="page-header">Demo</h1>
    <div class="row" style="margin-bottom: 20px;">
      <div class="col-md-6">
        <a href="https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/MapExample.vue" target="_blank">Source</a>
        <map-example></map-example>
      </div>
      <div class="col-md-6">
        <a href="https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/ChartExample.vue" target="_blank">Source</a>
        <chart-example></chart-example>
      </div>
    </div>
  </div>
</template>

<script>
import MapExample from './MapExample'
import ChartExample from './ChartExample'

export default {
  components: {
    MapExample,
    ChartExample
  },

  data () {
    return {
    }
  },

  computed: {

  },

  mounted () {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
