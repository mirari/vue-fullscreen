<template>
  <div>
    <h1 class="page-header">Install & and Usage</h1>
    <p>Install from GitHub via NPM</p>
    <pre><code class="prismjs language-bash">npm install vue-fullscreen</code></pre>
    <p>To use the vue-fullscreen component in your templates, simply import it, and register it with your component.</p>
    <pre class="prismjs"><code class="language-markup">&lt;template&gt;
  &lt;div id="app"&gt;
    &lt;fullscreen ref="fullscreen"&gt;
      Content
    &lt;/fullscreen&gt;
    &lt;button type="button" @click="toggle" &gt;Fullscreen&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;</code><code class="language-javascript">
  import Fullscreen from "vue-fullscreen"
  export default {
    components: {Fullscreen},
    methods: {
      toggle () {
        this.$refs['fullscreen'].toggle()
      }
    },
    data() {
      return {
        fullscreen: false
      }
    }
  }</code><code class="language-markup">
&lt;/script&gt;</code></pre>
    <p><b>Caution:</b>  Because of the browser security function, you can only set the <code>fullscreen</code> property by a user gesture. (e.g. a click callback)</p>
    <h1 class="page-header">Available options</h1>
    <h4>Props</h4>
    <table class="table table-bordered">
      <thead class="text-center">
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Default value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>fullscreen</td>
        <td>Just change it to toggle fullscreen mode. Use <code>.sync</code> to synchronize the parent's value</td>
        <td>false</td>
      </tr>
      <tr>
        <td>background</td>
        <td>The background style of wrapper, only available for fullscreen mode</td>
        <td>#333</td>
      </tr>
      <tr>
        <td>fullscreenClass</td>
        <td>Similar to the former, the class will be added to the wrapper when fullscreen mode is on</td>
        <td>'fullscreen'</td>
      </tr>
      </tbody>
    </table>
    <h4>Events</h4>
    <table class="table table-bordered">
      <thead class="text-center">
      <tr>
        <th>Event name</th>
        <th>Description</th>
        <th>Arguments</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>change</td>
        <td>will be triggered when the fullscreen mode changed</td>
        <td>(isFullscreen:boolean)</td>
      </tr>
      </tbody>
    </table>
    <h4>Methods</h4>
    <p>Except for the <code>.sync</code> modifier, you can call these methods after getting components by <code>refs</code>.</p>
    <table class="table table-bordered">
      <thead class="text-center">
      <tr>
        <th>Method name</th>
        <th>Description</th>
        <th>Arguments</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>toggle</td>
        <td>toggle the fullscreen mode. You can pass <code>value</code> to force enter or exit fullscreen mode</td>
        <td>(value:Boolean)(optional)</td>
      </tr>
      <tr>
        <td>enter</td>
        <td>toggle the fullscreen mode</td>
        <td>none</td>
      </tr>
      <tr>
        <td>exit</td>
        <td>toggle the fullscreen mode</td>
        <td>none</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
// import 'prismjs/themes/prism-coy.css'
export default {
  mounted () {
    Prism.highlightElement(this.$el.querySelector('.prismjs'))
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .table td {
    text-align: left;
  }
</style>
