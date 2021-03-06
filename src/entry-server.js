import createApp from './createApp';
import App from './App.vue';

const isDev = process.env.NODE_ENV !== 'production';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => new Promise((resolve, reject) => {
  const s = isDev && Date.now();
  const { app, router, store } = createApp();

  const { url } = context;
  const { fullPath } = router.resolve(url).route;

  if (fullPath !== url) {
    return reject({ url: fullPath });
  }

  // set router's location
  router.push(url);

  // wait until router has resolved possible async hooks
  return router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // no matched routes
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }

    // Adding App to matchedComponents so its asyncData is processed. We put some global data calls
    // in App.vue to avoid repeating the calls in every view.
    matchedComponents.push(App);

    // Call fetchData hooks on components matched by the route.
    // A preFetch hook dispatches a store action and returns a Promise,
    // which is resolved when the action is complete and store state has been
    // updated.
    return Promise.all(matchedComponents.map(comp => comp.asyncData && comp.asyncData.bind(comp)({
      store,
      route: router.currentRoute,
    }))).then(() => {
      /* eslint-disable-next-line no-console */
      if (isDev) console.log(`data pre-fetch: ${Date.now() - s}ms`);

      // After all preFetch hooks are resolved, our store is now
      // filled with the state needed to render the app.
      // Expose the state on the render context, and let the request handler
      // inline the state in the HTML response. This allows the client-side
      // store to pick-up the server-side state without having to duplicate
      // the initial data fetching on the client.
      /* eslint-disable-next-line no-param-reassign */
      context.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);
});
