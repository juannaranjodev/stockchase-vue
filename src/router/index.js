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
const Expert = () => import('../views/Expert.vue');
const ExpertRating = () => import('../views/ExpertRating.vue');
const Companies = () => import('../views/Companies.vue');
const Company = () => import('../views/Company.vue');
const TopPicks = () => import('../views/TopPicks.vue');

// route-level code splitting
const createListView = type => () => import('../views/createListView').then(m => m.default(type));

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: Home },

      // Top Picks listing
      { path: '/opinions/recenttop', component: TopPicks },
      { path: '/opinions/recenttop/sort/:sortBy/page/:page/direction/:direction/max/:perPage', component: TopPicks },

      // Market comments listing
      { path: '/opinions/market', component: createListView('comments') },
      { path: '/opinions/market/:date', component: createListView('comments') },
      { path: '/opinions/market/:date/:page', component: createListView('comments') },

      // Opinions listing
      { path: '/opinions/:date', component: createListView('opinions') },
      { path: '/opinions/:date/:page', component: createListView('opinions') },

      // Top/worst experts
      { path: '/expert/top', component: TopWorstExpertList },

      // Companies index. :type can be C (to search in company name) or F for symbol
      { path: '/company', component: Companies },
      { path: '/company/index/:character/:type', component: Companies },
      // NOTE: In v1 it's currently '.../desc/:sortBy...'. It should be '../sort/:sortBy' but we're
      // keeping the exact v1 behavior for now.
      { path: '/company/index/:character/:type/desc/:sortBy/page/:page/direction/:direction/max/:perPage', component: Companies },

      // Experts index. :type can be F (to search in first name) or L for last name
      { path: '/expert', component: Experts },
      { path: '/expert/index/:character/:type/sort/:sortBy/page/:page/direction/:direction/max/:perPage', component: Experts },
      { path: '/expert/index/:character/:type', component: Experts },

      // Company profile
      { path: '/company/view/:id', component: Company },
      { path: '/company/view/:id/:slug', component: Company },
      { path: '/company/view/:id/sort/:sortBy/page/:page/direction/:direction/max/:perPage', component: Company },

      // Expert profile
      { path: '/expert/view/:id', component: Expert },
      { path: '/expert/view/:id/:slug', component: Expert },
      { path: '/expert/view/:id/:name/rating', component: ExpertRating },
      { path: '/expert/view/:id/sort/:sortBy/page/:page/direction/:direction/max/:perPage', component: Expert },
    ],
  });

  router.beforeEach((to, from, next) => {
    // Redirect urls with trailing slash to no trailing slash equivalent
    if (!to.path.match(/^.+\/$/)) return next();

    const { query, hash, path } = to;
    const redirectTo = {
      path: path.replace(/\/$/, ''),
      query,
      hash,
    };

    return next(redirectTo);
  });

  return router;
}
