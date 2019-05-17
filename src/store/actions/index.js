import _ from 'lodash';
import api from '../../api';
import * as c from '../../constants';
import expertActions from './expert';
import companyActions from './company';

export default {
  ...expertActions,
  ...companyActions,

  FETCH_DAILY_OPINIONS: ({ commit }, urlParams) => {
    const { type, page } = urlParams;
    let { date: dateParam } = urlParams;
    // /opinions/view/:id or /opinions/market/view/:id
    // redirects to anchor link
    if (dateParam === 'view') {
      if (!/^\d+$/.test(page)) return Promise.reject({ code: 404 });

      // Redirect to the canonical url (with 301 code for SEO purpose)
      return api.getOpinionUrl(page).then(url => Promise.reject({ url, code: 301 }));
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

  RATE_EXPERT: ({ commit, state }, { id, rating }) => api.rateExpert({ id, rating })
    .then((response) => {
      const expert = _.clone(state.expert);
      expert.SocialRatings = expert.SocialRatings || [];
      const ratingIndex = _.findIndex(expert.SocialRatings, { id: response.id });

      // If existing rating found, replace it with the new one
      if (ratingIndex !== -1) {
        expert.SocialRatings[ratingIndex] = response;
      } else {
        expert.SocialRatings.push(response);
      }

      commit('SET_EXPERT', expert);
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

  FETCH_DISQUS_COMMENTS_COUNT: ({ commit }) => api.fetchDisqusComments()
    .then(comments => commit('SET_DISQUS_COMMENTS', comments)),

  FETCH_COMPANY: ({ commit }, urlParams) => {
    const { id, symbol } = urlParams;
    let { page, perPage } = urlParams;

    // Redirect not found paths to company index according to v1 company controller logic
    if (!/^\d+$/.test(id)) return Promise.reject({ url: '/company' });

    return api.fetchCompanyById(id).then((company) => {
      if (!company) return Promise.reject({ url: '/company' });

      // Redirect urls with wrong slugs to the canonical slug
      if (!page && symbol !== company.slug) return Promise.reject({ url: company.url, code: 301 });

      commit('SET_COMPANY', company);
      page = page || 1;
      perPage = perPage || 15;

      return Promise.all([
        api.countCompanyOpinions(id),
        api.fetchCompanyOpinionsByPage(id, page, perPage),
      ]).then((result) => {
        const [numOpinions, pageOpinions] = result;

        commit('SET_NUM_TOTAL_OPINIONS', numOpinions);
        commit('SET_OPINIONS', pageOpinions);
      });
    });
  },

  FETCH_EXPERT: ({ commit }, urlParams) => {
    const { id, name } = urlParams;
    let { page, perPage } = urlParams;

    // Redirect not found paths to expert index according to v1 expert controller logic
    if (!/^\d+$/.test(id)) return Promise.reject({ url: '/expert' });

    return api.fetchExpertById(id).then((expert) => {
      if (!expert) return Promise.reject({ url: '/company' });

      // Redirect urls with wrong slugs to the canonical url
      if (!page && name !== expert.slug) return Promise.reject({ url: expert.url, code: 301 });

      commit('SET_EXPERT', expert);
      page = page || 1;
      perPage = perPage || 15;

      return Promise.all([
        api.countExpertOpinions(id),
        api.fetchExpertOpinionsByPage(id, page, perPage),
        api.fetchExpertTopPicks(id, 5),
        api.fetchExpertFirstOpinionDate(id),
      ]).then((result) => {
        const [numOpinions, pageOpinions, topPicks, firstOpinionDate] = result;

        commit('SET_NUM_TOTAL_OPINIONS', numOpinions);
        commit('SET_OPINIONS', pageOpinions);
        commit('SET_EXPERT_TOP_PICKS', topPicks);
        commit('SET_EXPERT_JOIN_DATE', firstOpinionDate);
      });
    });
  },
};
