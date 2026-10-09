import Fullscreen from 'vue-fullscreen'
// Universal registration intentionally exercises the server import and render.
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Fullscreen)
})
