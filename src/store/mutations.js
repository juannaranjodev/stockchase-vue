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

  SET_RECENT_OPINIONS: (state, recentOpinions=[]) => {
    state.recentOpinions = recentOpinions
  },

  SET_DATE: (state, date) => {
    state.date = date
  },

  SET_OLDER_DATE: (state, date) => {
    state.olderDate = date
  },

  SET_NEWER_DATE: (state, date) => {
    state.newerDate = date
  },

  SET_USER: (state, user={}) => {
    state.user = user
  },

  SET_TOP_PICKS: (state, topPicks=[]) => {
    state.topPicks = topPicks
  },

  SET_TRENDING_STOCKS: (state, trendingStocks=[]) => {
    state.trendingStocks = trendingStocks
  },

  // SET_ACTIVE_TYPE: (state, { type }) => {
  //   state.activeType = type
  // },
  //
  // SET_LIST: (state, { type, ids }) => {
  //   state.lists[type] = ids
  // },
  //
  // SET_ITEMS: (state, { items }) => {
  //   items.forEach(item => {
  //     if (item) {
  //       Vue.set(state.items, item.id, item)
  //     }
  //   })
  // },
  //
  // SET_USER: (state, { id, user }) => {
  //   Vue.set(state.users, id, user || false) /* false means user not found */
  // }
}
