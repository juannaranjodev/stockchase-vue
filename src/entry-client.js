import 'core-js/shim';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import Ads from 'vue-google-adsense';
import createApp from './createApp';
import ProgressBar from './components/ProgressBar.vue';

// These adsense components are specific to the client app, putting them in the server app would
// break the build
Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

// EventBus
// NOTE this should only be referenced in the client app (browser life-cycle hooks)
Vue.prototype.$bus = new Vue();

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
