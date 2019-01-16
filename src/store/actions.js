import api from '../api'
import * as c from '../constants'
import _ from 'lodash'

export default {
  FETCH_DAILY_OPINIONS: ({ commit, dispatch, state }, { type, date, page }) => {
    // /opinions/view/:id or /opinions/market/view/:id
    // redirects to anchor link
    if (date === 'view') {
      if (!/^\d+$/.test(page)) return Promise.reject({ code: 404 })

      return api.getOpinionUrl(page).then(url => {
        return Promise.reject({ url })
      })
    }

    // /opinions/market
    // shows recent content
    if (type === 'comments' && !page && !date) date = 'recent'

    const method = type === 'opinions' ? 'fetchDailyOpinions' : 'fetchDailyMarketComments'

    return api[method](date)
      .then(({ opinions, date, adjacentDates }) => {
        const dateIndex = adjacentDates.findIndex(adjacentDate => adjacentDate.date === date)
        const newerDateIndex = dateIndex > 0 ? dateIndex - 1 : -1
        const olderDateIndex = dateIndex < adjacentDates.length - 1 ? dateIndex + 1 : -1

        // Update opinion url to include page number
        opinions = _.map(opinions, (opinion, index) => {
          const pageIndex = Math.floor(index / c.PER_PAGE) + 1
          return {
            ...opinion.toJSON(),
            anchor_url: `/opinions/${date}/${pageIndex}#${opinion.id}`
          }
        })

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
}
