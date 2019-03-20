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

  loggedIn (state) {
    return !!state.user.email
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

  latestExperts (state) {
    return state.latestExperts
  },

  newestExperts (state) {
    return state.newestExperts
  },

  newestCompanies (state) {
    return state.newestCompanies
  },

  blogPosts (state) {
    return state.blogPosts
  },

  latestComment (state) {
    return state.latestComment
  },

  marketCallGuests (state) {
    return state.marketCallGuests
  },

  premiumCompanies (state) {
    return state.premiumCompanies
  },

  experts (state) {
    return state.experts
  },

  totalExperts (state) {
    return state.totalExperts
  },
}
