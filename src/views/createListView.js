import Opinions from './Opinions.vue';

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView(type) {
  return {
    name: `${type}-list`,

    asyncData({ store, route }) {
      return store.dispatch('FETCH_DAILY_OPINIONS', {
        type,
        date: route.params.date,
        page: route.params.page,
      });
    },

    title() {
      const route = this.$router.currentRoute;
      const dateParam = route.params.date;
      let title;
      if (route.path.indexOf('/opinions/market') === 0) {
        // Market comments
        title = 'Daily Stock Market Comments';
        if (dateParam) title = `${title} — ${dateParam}`;
      } else {
        // Opinions
        title = dateParam === 'recent'
          ? 'Recent Opinions'
          : `Daily Opinions — ${dateParam}`;
      }

      return title;
    },

    render(h) {
      return h(Opinions, { props: { type } });
    },
  };
}
