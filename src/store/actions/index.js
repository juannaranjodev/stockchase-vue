import _ from 'lodash';
import api from '../../api';
import * as c from '../../constants';
import expertActions from './expert';

export default {
  ...expertActions,

  FETCH_DAILY_OPINIONS: ({ commit }, urlParams) => {
    const { type, page } = urlParams;
    let { date: dateParam } = urlParams;
    // /opinions/view/:id or /opinions/market/view/:id
    // redirects to anchor link
    if (dateParam === 'view') {
      if (!/^\d+$/.test(page)) return Promise.reject({ code: 404 });

      return api.getOpinionUrl(page).then(url => Promise.reject({ url }));
    }

    // /opinions/market
    // shows recent content
    if (type === 'comments' && !page && !dateParam) dateParam = 'recent';

    const method = type === 'opinions' ? 'fetchDailyOpinions' : 'fetchDailyMarketComments';

    return api[method](dateParam)
      .then((result) => {
        const { date, adjacentDates } = result;
        let { opinions } = result;

        const dateIndex = adjacentDates.findIndex(adjacentDate => adjacentDate.date === date);
        const newerDateIndex = dateIndex > 0 ? dateIndex - 1 : -1;
        const olderDateIndex = dateIndex < adjacentDates.length - 1 ? dateIndex + 1 : -1;

        // Update opinion url to include page number
        opinions = _.map(opinions, (opinion, index) => {
          const pageIndex = Math.floor(index / c.PER_PAGE) + 1;
          return {
            ...opinion.toJSON(),
            anchor_url: `/opinions/${date}/${pageIndex}#${opinion.id}`,
          };
        });

        commit('SET_DATE', date);
        commit('SET_OLDER_DATE', olderDateIndex > -1 && adjacentDates[olderDateIndex]);
        commit('SET_NEWER_DATE', newerDateIndex > -1 && adjacentDates[newerDateIndex]);
        commit('SET_ADJACENT_DATES', adjacentDates);
        commit('SET_OPINIONS', opinions);
      });
  },

  FETCH_DISCOVER_POSTS: ({ commit }) => api.fetchDiscoverPosts()
    .then(posts => commit('SET_DISCOVER_POSTS', posts))
    .catch(() => commit('SET_DISCOVER_POSTS', [])),

  FETCH_LATEST_EXPERTS: ({ commit }, num) => api.fetchLatestExperts(num)
    .then(experts => commit('SET_LATEST_EXPERTS', experts))
    .catch(() => commit('SET_LATEST_EXPERTS', [])),

  FETCH_NEWEST_EXPERTS: ({ commit }, num) => api.fetchNewestExperts(num)
    .then(experts => commit('SET_NEWEST_EXPERTS', experts))
    .catch(() => commit('SET_NEWEST_EXPERTS', [])),

  FETCH_NEWEST_COMPANIES: ({ commit }, num) => api.fetchNewestCompanies(num)
    .then(companies => commit('SET_NEWEST_COMPANIES', companies))
    .catch(() => commit('SET_NEWEST_COMPANIES', [])),

  FETCH_BLOG_POSTS: ({ commit }, num) => api.fetchBlogPosts(num)
    .then(posts => commit('SET_BLOG_POSTS', posts))
    .catch(() => commit('SET_BLOG_POSTS', [])),

  FETCH_LATEST_COMMENT: ({ commit }) => api.fetchLatestComment()
    .then(comment => commit('SET_LATEST_COMMENT', comment))
    .catch(() => commit('SET_LATEST_COMMENT', [])),

  FETCH_MARKET_CALL_GUESTS: ({ commit }, num) => api.fetchMarketCallGuests(num)
    .then(guests => commit('SET_MARKET_CALL_GUESTS', guests))
    .catch(() => commit('SET_MARKET_CALL_GUESTS', [])),

  FETCH_PREMIUM_COMPANIES: ({ commit }) => api.fetchPremiumCompanies()
    .then(companies => commit('SET_PREMIUM_COMPANIES', companies))
    .catch(() => commit('SET_PREMIUM_COMPANIES', [])),

  FETCH_USER: ({ commit }) => api.fetchUser()
    .then(user => commit('SET_USER', user))
    .catch(() => commit('SET_USER', {})),

  RATE_OPINION: ({ commit, state }, { id, rating }) => api.rateOpinion({ id, rating })
    .then((response) => {
      const opinion = _.clone(state.opinions[id]);
      opinion.SocialRatings = opinion.SocialRatings || [];
      const ratingIndex = _.findIndex(opinion.SocialRatings, { id: response.id });

      // If existing rating found, replace it with the new one
      if (ratingIndex !== -1) {
        opinion.SocialRatings[ratingIndex] = response;
      } else {
        opinion.SocialRatings.push(response);
      }

      commit('UPDATE_OPINION', opinion);
    }),

  RATE_COMPANY: ({ commit, state }, { id, rating }) => api.rateCompany({ id, rating })
    .then((response) => {
      const company = _.clone(state.company);
      company.SocialRatings = company.SocialRatings || [];
      const ratingIndex = _.findIndex(company.SocialRatings, { id: response.id });

      // If existing rating found, replace it with the new one
      if (ratingIndex !== -1) {
        company.SocialRatings[ratingIndex] = response;
      } else {
        company.SocialRatings.push(response);
      }

      commit('SET_COMPANY', company);
    }),

  CREATE_USER_STOCK: ({ commit, state }, { companyId }) => api.createUserStock({ companyId })
    .then((stock) => {
      const user = _.clone(state.user);
      user.UserStocks = user.UserStocks || [];
      const stockIndex = _.findIndex(user.UserStocks, { id: stock.id });

      // If existing rating found, replace it with the new one
      if (stockIndex !== -1) {
        user.UserStocks[stockIndex] = stock;
      } else {
        user.UserStocks.push(stock);
      }

      commit('SET_USER', user);
    }),

  FETCH_DISQUS_COMMENTS_COUNT: ({ commit }) => api.fetchDisqusCommentsCount()
    .then(count => commit('SET_DISQUS_COMMENTS_COUNT', count)),

  FETCH_COMPANY: ({ commit }, urlParams) => {
    const { id, symbol } = urlParams;
    let { page, perPage } = urlParams;

    if (!/^\d+$/.test(id)) return Promise.reject({ code: 404 });

    return api.fetchCompanyById(id).then((company) => {
      if (!company) return Promise.reject({ code: 404 });
      if (!symbol && !page) {
        return Promise.reject({
          url: `/company/view/${id}/${company
            .symbol}`,
        });
      }

      commit('SET_COMPANY', company);
      page = page || 1;
      perPage = perPage || 15;

      return Promise.all([
        api.countOpinionsByCompany(id),
        api.fetchOpinionsByCompany(id, page, perPage),
      ]).then((result) => {
        const [numOpinions, pageOpinions] = result;

        commit('SET_NUM_TOTAL_OPINIONS', numOpinions);
        commit('SET_OPINIONS', pageOpinions);
      });
    });
  },
};
