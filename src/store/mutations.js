import Vue from 'vue'
import _ from 'lodash'

export default {
  SET_OPINIONS: (state, opinions=[]) => {
    opinions.forEach(opinion => {
      if (opinion) {
        Vue.set(state.opinions, opinion.id, opinion)
      }
    })
  },

  UPDATE_OPINION: (state, opinion={}) => {
    Vue.set(state.opinions, opinion.id, opinion)
  },

  SET_DATE: (state, date) => {
    state.date = date
  },

  SET_ADJACENT_DATES: (state, date) => {
    state.adjacentDates = date
  },

  SET_OLDER_DATE: (state, date) => {
    state.olderDate = date
  },

  SET_NEWER_DATE: (state, date) => {
    state.newerDate = date
  },

  SET_USER: (state, user={}) => {
    user.loaded = true
    state.user = user
  },

  SET_TOP_PICKS: (state, topPicks=[]) => {
    state.topPicks = topPicks
  },

  SET_TRENDING_STOCKS: (state, trendingStocks=[]) => {
    state.trendingStocks = trendingStocks
  },

  SET_DISCOVER_POSTS: (state, discoverPosts=[]) => {
    state.discoverPosts = discoverPosts
  },
}
