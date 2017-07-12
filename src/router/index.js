import Vue from 'vue'
import Router from 'vue-router'

import mainArea from '../components/mainArea'
import topicsDetail from '../components/topicsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: mainArea
    },
    {
      path: '/topic/:id',
      name:'topic',
      component: topicsDetail,
    },
  ]
})
