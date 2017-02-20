// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.jQuery = require('jquery')
window.$ = window.jQuery
require('bootstrap/dist/js/bootstrap.js')

import Vue from 'vue'
import App from './App'
import router from './router'

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
