import OpinionsList from './OpinionsList.vue'

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type) {
  return {
    name: `${type}-list`,

    asyncData ({ store, route }) {
      return store.dispatch('FETCH_DAILY_OPINIONS', { type, date: route.params.date })
    },

    title: (type === 'opinions' ? 'Recent Opinions' : 'Daily Stock Market Comments'),

    render (h) {
      return h(OpinionsList, { props: { type }})
    }
  }
}
