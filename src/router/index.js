import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Sheet from 'components/Sheet'
import CombatTracker from 'components/CombatTracker'
import Spells from 'components/Spells'
import License from 'components/License'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'D&D Next Webtools Homepage',
      component: Home
    },
    {
      path: '/license',
      name: 'License',
      component: License
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
    },
    {
      path: '/spells',
      name: 'Spells',
      component: Spells
    }
  ]
})
