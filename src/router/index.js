import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = type => () => import('../views/CreateListView').then(m => m.default(type))

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', redirect: '/opinions/recent/1' },
      { path: '/opinions/market', redirect: '/opinions/market/recent/1' },
      { path: '/opinions/market/:date', redirect: '/opinions/market/:date/1' },
      { path: '/opinions/market/:date/:page', component: createListView('comments') },
      { path: '/opinions/:date', redirect: '/opinions/:date/1' },
      { path: '/opinions/:date/:page', component: createListView('opinions') },
    ]
  })
}
