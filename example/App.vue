<template>
  <div id="app">
    <a
      class="github-fork-ribbon"
      href="https://github.com/mirari/vue-fullscreen"
      title="Fork me on GitHub"
    >Fork me on GitHub</a>
    <section
      class="hero is-primary"
      style="margin-bottom: 2em"
    >
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <p class="title is-1">
                vue-fullscreen
              </p>
              <p class="subtitle is-4">
                A simple Vue.js component for fullscreen, based on <a
                  href="https://sindresorhus.com/screenfull.js/"
                  target="_blank"
                >screenfull</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="container"
      style="margin-bottom: 30px"
    >
      <example />
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <a
              href="https://mirari.cc"
              target="_blank"
              title="mirari.cc"
            >
              <strong>mirari.cc</strong>
            </a>
            ·  GitHub
            <a
              href="https://github.com/mirari"
              target="_blank"
              title="GitHub"
            >
              @mirari
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Example from './views/example/index.vue'

export default {
  name: 'App',
  components: {
    Example,
  },
}
</script>
<style lang="scss">
  .fullscreen {
    z-index: 10000;
    background: cyan;
  }
</style>
