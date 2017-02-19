import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Sheet from 'components/Sheet'
import CombatTracker from 'components/CombatTracker'

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
    },
    {
      path: '/combat',
      name: 'Combat Tracker',
      component: CombatTracker
    }
  ]
})
