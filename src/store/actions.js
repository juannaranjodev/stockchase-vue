import api from '../api'

export default {
  FETCH_DAILY_OPINIONS: ({ commit, dispatch, state }, { date }) => {
    return api.fetchDailyOpinions(date)
      .then(({ opinions, recentOpinions, date, olderDate, newerDate }) => {
        commit('SET_DATE', date)
        commit('SET_OLDER_DATE', olderDate)
        commit('SET_NEWER_DATE', newerDate)
        commit('SET_OPINIONS', opinions)
        commit('SET_RECENT_OPINIONS', recentOpinions)
      })
  },

  FETCH_USER: ({ commit, dispatch, state }) => {
    return api.fetchUser()
      .then(user => commit('SET_USER', user))
  },

  FETCH_TOP_PICKS: ({ commit, dispatch, state }) => {
    return api.fetchTopPicks()
      .then(items => commit('SET_TOP_PICKS', items))
  },

  FETCH_TRENDING_STOCKS: ({ commit, dispatch, state }) => {
    return api.fetchTrendingStocks()
      .then(items => commit('SET_TRENDING_STOCKS', items))
  },

  RATE_OPINION: ({ commit, dispatch, state }, { id, rating }) => {
    return api.rateOpinion({ id, rating })
      .then(rating => {
        const opinion = _.clone(state.opinions[rating.opinion])
        opinion.SocialRatings = opinion.SocialRatings || []
        const ratingIndex = _.findIndex(opinion.SocialRatings, { id: rating.id })

        // If existing rating found, replace it with the new one
        if (ratingIndex !== -1) {
          opinion.SocialRatings[ratingIndex] = rating
        } else {
          opinion.SocialRatings.push(rating)
        }

        commit('UPDATE_OPINION', opinion)
      })
  },

  // // ensure data for rendering given list type
  // FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
  //   commit('SET_ACTIVE_TYPE', { type })
  //   return fetchIdsByType(type)
  //     .then(ids => commit('SET_LIST', { type, ids }))
  //     .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
  // },
  //
  // // ensure all active items are fetched
  // ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
  //   return dispatch('FETCH_ITEMS', {
  //     ids: getters.activeIds
  //   })
  // },
  //
  // FETCH_ITEMS: ({ commit, state }, { ids }) => {
  //   // on the client, the store itself serves as a cache.
  //   // only fetch items that we do not already have, or has expired (3 minutes)
  //   const now = Date.now()
  //   ids = ids.filter(id => {
  //     const item = state.items[id]
  //     if (!item) {
  //       return true
  //     }
  //     if (now - item.__lastUpdated > 1000 * 60 * 3) {
  //       return true
  //     }
  //     return false
  //   })
  //   if (ids.length) {
  //     return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
  //   } else {
  //     return Promise.resolve()
  //   }
  // },
  //
  // FETCH_USER: ({ commit, state }, { id }) => {
  //   return state.users[id]
  //     ? Promise.resolve(state.users[id])
  //     : fetchUser(id).then(user => commit('SET_USER', { id, user }))
  // }
}
