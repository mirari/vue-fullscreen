import Vue from 'vue'
import App from './App.vue'

import 'bulma/bulma.sass'

/* eslint-disable */
console.log(Vue.version)

const app = new Vue({
  el: '#app',
  ...App,
})
