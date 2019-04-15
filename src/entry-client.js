import 'babel-polyfill';

import Vue from 'vue';
import 'es6-promise/auto';
import createApp from './app';
import ProgressBar from './components/ProgressBar.vue';

// global progress bar
Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(Vue.prototype.$bar.$el);

const { app, router, store } = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
/* eslint-disable no-underscore-dangle */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
/* eslint-enable no-underscore-dangle */

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // actually mount to DOM
  app.$mount('#app');
});
