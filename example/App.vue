<template>
  <div id="app">
    <a class="github-fork-ribbon" href="https://github.com/mirari/vue-fullscreen" title="Fork me on GitHub">Fork me on GitHub</a>
    <div class="container">
      <example></example>
      <div class="row">
        <doc class="col-md-12"></doc>
      </div>
    </div>
  </div>
</template>

<script>
import Doc from './views/Doc'
import Example from './views/example'

export default {
  components: {
    Doc,
    Example
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  $mdi-font-path: '~mdi/fonts/';
  @import "~mdi/scss/materialdesignicons.scss";
</style>
