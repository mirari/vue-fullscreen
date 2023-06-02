<template>
  <div>
    <h1 class="title">
      Demo
    </h1>
    <hr />
    <div style="margin-bottom: 6em">
      <h2 class="title is-4">
        Component
      </h2>
      <p class="subtitle">
        <a
          href="https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/ComponentExample.vue"
          target="_blank"
        >Source</a>
      </p>
      <component-example />
    </div>
    <div>
      <h2 class="title is-4">
        Api
      </h2>
      <p class="subtitle">
        <a
          href="https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/ApiExample.vue"
          target="_blank"
        >Source</a>
      </p>
      <api-example />
    </div>
    <div>
      <h2 class="title is-4">
        Directive
      </h2>
      <p class="subtitle">
        <a
          href="https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/DirectiveExample.vue"
          target="_blank"
        >Source</a>
      </p>
      <directive-example />
    </div>
  </div>
</template>

<script>
import ComponentExample from './ComponentExample.vue'
import ApiExample from './ApiExample.vue'
import DirectiveExample from './DirectiveExample.vue'

export default {
  components: {
    DirectiveExample,
    ComponentExample,
    ApiExample,
  },

  data() {
    return {
    }
  },

  computed: {

  },

  mounted() {

  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
