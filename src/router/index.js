import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// IMPORTANT route component must be a function that returns the import statement
// otherwise we get weird router behaviors
// BAD (will automatically redirect to same url without url hash)
//   import Home from '../views/Home'
//   ...
//   { path: '/', component: Home }
// BAD (will hang)
//   import Home from '../views/Home'
//   ...
//   { path: '/', component: () => Home }
// GOOD
//   const Home = () => import('../views/Home')
//   ...
//   { path: '/', component: Home }

const Home = () => import('../views/Home.vue');
const TopWorstExpertList = () => import('../views/TopWorstExpertList.vue');
const Experts = () => import('../views/Experts.vue');
const Company = () => import('../views/Company.vue');

// route-level code splitting
const createListView = type => () => import('../views/createListView').then(m => m.default(type));

export default function createRouter() {
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
      { path: '/expert', component: Experts },
      { path: '/expert/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage', component: Experts },
      { path: '/expert/index/:character/:type', component: Experts },
      { path: '/company/view/:id', component: Company },
      { path: '/company/view/:id/:symbol', component: Company },
      { path: '/company/view/:id/sort/date/page/:page/direction/desc/max/:perPage', component: Company },
    ],
  });
}
