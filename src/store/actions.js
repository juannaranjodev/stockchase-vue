import api from '../api'

export default {
  FETCH_DAILY_OPINIONS: ({ commit, dispatch, state }, { date, type }) => {
    const method = type === 'opinions' ? 'fetchDailyOpinions' : 'fetchDailyMarketComments'

    return api[method](date)
      .then(({ opinions, date, adjacentDates }) => {
        const dateIndex = adjacentDates.findIndex(adjacentDate => adjacentDate.date === date)
        const olderDateIndex = dateIndex > 0 ? dateIndex - 1 : -1
        const newerDateIndex = dateIndex < adjacentDates.length - 1 ? dateIndex + 1 : -1

        commit('SET_DATE', date)
        commit('SET_OLDER_DATE', olderDateIndex > -1 && adjacentDates[olderDateIndex])
        commit('SET_NEWER_DATE', newerDateIndex > -1 && adjacentDates[newerDateIndex])
        commit('SET_ADJACENT_DATES', adjacentDates)
        commit('SET_OPINIONS', opinions)
      })
  },

  FETCH_USER: ({ commit, dispatch, state }) => {
    return api.fetchUser()
      .then(user => commit('SET_USER', user))
      .catch(() => commit('SET_USER', {}))
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

  SET_IS_MOBILE: ({ commit, dispatch, state }, isMobile) => {
    commit('SET_IS_MOBILE', isMobile)
  },
}
