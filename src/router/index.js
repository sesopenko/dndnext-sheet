import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Sheet from 'components/Sheet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sheet',
      name: 'Sheet',
      component: Sheet
    }
  ]
})
