import _ from 'lodash'
export default {
  opinions (state, getters) {
    return _.values(state.opinions)
  },

  date (state, getters) {
    return state.date
  },

  adjacentDates (state, getters) {
    return state.adjacentDates
  },

  olderDate (state, getters) {
    return state.olderDate
  },

  newerDate (state, getters) {
    return state.newerDate
  },

  user (state) {
    return state.user
  },

  adFree (state) {
    return state.user.ad_free
  },

  shouldShowAd (state, getters) {
    return getters.user.loaded && !getters.adFree
  },

  topPicks (state) {
    return state.topPicks
  },

  trendingStocks (state) {
    return state.trendingStocks
  },

  discoverPosts (state) {
    return state.discoverPosts
  },

}
