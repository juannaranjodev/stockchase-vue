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

  shouldShowAd (state, getters) {
    return getters.user.loaded && !getters.user.ad_free
  },

  topPicks (state) {
    return state.topPicks
  },

  trendingStocks (state) {
    return state.trendingStocks
  },

  isMobile (state) {
    return state.isMobile
  },
}
