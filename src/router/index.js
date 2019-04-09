import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import TopWorstExpertList from '../views/TopWorstExpertList'
import ExpertsView from '../views/Experts'
import createListView from '../views/createListView'

Vue.use(Router)

// route-level code splitting
const createListViewFor = type => createListView(type)

export function createRouter () {
  return new Router({
    mode: 'abstract',
    fallback: false,
    scrollBehavior: function(to, from, savedPosition) {
      if (to.hash) {
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      { path: '/', component: () => import('../views/Home.vue') },
      { path: '/opinions/market', component: createListView('comments') },
      { path: '/opinions/market/:date', component: createListView('comments') },
      { path: '/opinions/market/:date/:page', component: createListView('comments') },
      { path: '/opinions/:date', component: createListView('opinions') },
      { path: '/opinions/:date/:page', component: createListView('opinions') },
      { path: '/expert', component: () => ExpertsView },
      { path: '/expert/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage', component: () => ExpertsView },
      { path: '/expert/index/:character/:type', component: () => ExpertsView },
    ]
  })
}
