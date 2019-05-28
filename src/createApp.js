import Vue from 'vue';
import { sync } from 'vuex-router-sync';

// TODO extract the following `Vue.use` to separate 'plugin' files
import BootstrapVue from 'bootstrap-vue';
import VueDisqus from 'vue-disqus';
import SocialSharing from 'vue-social-sharing';
import NoSsr from 'vue-no-ssr';

import * as filters from './util/filters';
import mixins from './mixins';
import createRouter from './router';
import createStore from './store';
import App from './App.vue';

Vue.use(require('vue-script2'));

Vue.use(BootstrapVue);
Vue.use(VueDisqus);
Vue.use(SocialSharing);

/* eslint-disable-next-line vue/match-component-file-name */
Vue.component('no-ssr', NoSsr);

// register global mixins.
Object.keys(mixins).forEach(key => Vue.mixin(mixins[key]));

// register global utility filters.
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export default function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store };
}
