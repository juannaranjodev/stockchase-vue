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
      { path: '/', redirect: '/opinions/recent' },
      { path: '/opinions/market', component: createListView('comments') },
      { path: '/opinions/market/:date', component: createListView('comments') },
      { path: '/opinions/:date', component: createListView('opinions') },
    ]
  })
}
