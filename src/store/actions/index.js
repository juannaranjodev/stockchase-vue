import api from '../../api'
import * as c from '../../constants'
import _ from 'lodash'
import expertActions from './expert'

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

  FETCH_DISCOVER_POSTS: ({ commit, dispatch, state }) => {
    return api.fetchDiscoverPosts()
      .then(posts => commit('SET_DISCOVER_POSTS', posts))
      .catch(() => commit('SET_DISCOVER_POSTS', []))
  },

  FETCH_LATEST_EXPERTS: ({ commit, dispatch, state }, num) => {
    return api.fetchLatestExperts(num)
      .then(experts => commit('SET_LATEST_EXPERTS', experts))
      .catch(() => commit('SET_LATEST_EXPERTS', []))
  },

  FETCH_NEWEST_EXPERTS: ({ commit, dispatch, state }, num) => {
    return api.fetchNewestExperts(num)
      .then(experts => commit('SET_NEWEST_EXPERTS', experts))
      .catch(() => commit('SET_NEWEST_EXPERTS', []))
  },

  FETCH_NEWEST_COMPANIES: ({ commit, dispatch, state }, num) => {
    return api.fetchNewestCompanies(num)
      .then(companies => commit('SET_NEWEST_COMPANIES', companies))
      .catch(() => commit('SET_NEWEST_COMPANIES', []))
  },

  FETCH_BLOG_POSTS: ({ commit, dispatch, state }, num) => {
    return api.fetchBlogPosts(num)
      .then(posts => commit('SET_BLOG_POSTS', posts))
      .catch(() => commit('SET_BLOG_POSTS', []))
  },

  FETCH_LATEST_COMMENT: ({ commit, dispatch, state }) => {
    return api.fetchLatestComment()
      .then(comment => commit('SET_LATEST_COMMENT', comment))
      .catch(() => commit('SET_LATEST_COMMENT', []))
  },

  FETCH_MARKET_CALL_GUESTS: ({ commit, dispatch, state }, num) => {
    return api.fetchMarketCallGuests(num)
      .then(guests => commit('SET_MARKET_CALL_GUESTS', guests))
      .catch(() => commit('SET_MARKET_CALL_GUESTS', []))
  },

  FETCH_PREMIUM_COMPANIES: ({ commit, dispatch, state }) => {
    return api.fetchPremiumCompanies()
      .then(companies => commit('SET_PREMIUM_COMPANIES', companies))
      .catch(() => commit('SET_PREMIUM_COMPANIES', []))
  },

  FETCH_USER: ({ commit, dispatch, state }) => {
    return api.fetchUser()
      .then(user => commit('SET_USER', user))
      .catch(() => commit('SET_USER', {}))
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

  CREATE_USER_STOCK: ({ commit, dispatch, state }, { company_id }) => {
    return api.createUserStock({ company_id })
      .then(stock => {
        const user = _.clone(state.user)
        user.UserStocks = user.UserStocks || []
        const stockIndex = _.findIndex(user.UserStocks, { id: stock.id })

        // If existing rating found, replace it with the new one
        if (stockIndex !== -1) {
          user.UserStocks[stockIndex] = stock
        } else {
          user.UserStocks.push(stock)
        }

        commit('SET_USER', user)
      })
  },

  ...expertActions,
}
