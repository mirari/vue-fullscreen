<template>
  <div id="app">
    <a class="github-fork-ribbon" href="https://github.com/mirari/vue-fullscreen" title="Fork me on GitHub">Fork me on GitHub</a>
    <div class="jumbotron">
      <div class="container">
        <h1>vue-fullscreen</h1>
        <p>A simple Vue.js component for fullscreen</p>
      </div>
    </div>
    <div class="container">
      <example></example>
      <div class="row">
        <doc class="col-md-12 markdown-body"></doc>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <h4>
          <a href="https://mirari.cc" target="_blank" title="mirari.cc">
            mirari.cc
          </a>
          ·  GitHub
          <a href="https://github.com/mirari" target="_blank" title="GitHub">
            @mirari
          </a>
        </h4>
      </div>
    </footer>
  </div>
</template>

<script>
import Doc from '../README.md'
import Example from './views/example'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'

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

  .jumbotron {
    color: white;
    background: #41b883;
  }

  .footer {
    margin-top: 30px;
    padding: 20px;
    color: white;
    background: #41b883;
    text-align: center;

    a {
      color: white;
    }
  }
</style>
