import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import TopWorstExpertList from '../views/TopWorstExpertList'
import ExpertsView from '../views/Experts'

Vue.use(Router)

// route-level code splitting
// Note must return a function, otherwise we get weird router behavior
// (automatically redirect to same url without hashbang)
const createListView = type => () => import('../views/createListView').then(m => m.default(type))

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: Home },
      { path: '/opinions/market', component: createListView('comments') },
      { path: '/opinions/market/:date', component: createListView('comments') },
      { path: '/opinions/market/:date/:page', component: createListView('comments') },
      { path: '/opinions/:date', component: createListView('opinions') },
      { path: '/opinions/:date/:page', component: createListView('opinions') },
      { path: '/expert/top', component: TopWorstExpertList },
      { path: '/expert', component: ExpertsView },
      { path: '/expert/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage', component: ExpertsView },
      { path: '/expert/index/:character/:type', component: ExpertsView },
    ]
  })
}
