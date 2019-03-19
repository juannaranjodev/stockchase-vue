import Vue from 'vue'
import Router from 'vue-router'
import TopWorstExpertList from '../views/TopWorstExpertList'

Vue.use(Router)

// route-level code splitting
const createListView = type => () => import('../views/CreateListView').then(m => m.default(type))

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: () => import('../views/Home.vue') },
      { path: '/opinions/market', component: createListView('comments') },
      { path: '/opinions/market/:date', component: createListView('comments') },
      { path: '/opinions/market/:date/:page', component: createListView('comments') },
      { path: '/opinions/:date', component: createListView('opinions') },
      { path: '/opinions/:date/:page', component: createListView('opinions') },
      { path: '/expert/top', component: TopWorstExpertList },
    ]
  })
}
