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
      { path: '/', component: Home },
      { path: '/opinions/market', component: createListViewFor('comments') },
      { path: '/opinions/market/:date', component: createListViewFor('comments') },
      { path: '/opinions/market/:date/:page', component: createListViewFor('comments') },
      { path: '/opinions/:date', component: createListViewFor('opinions') },
      { path: '/opinions/:date/:page', component: createListViewFor('opinions') },
      { path: '/expert/top', component: TopWorstExpertList },
      { path: '/expert', component: ExpertsView },
      { path: '/expert/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage', component: ExpertsView },
    ]
  })
}
