import _ from 'lodash';
import api from '../../api';

export default {
  SEARCH_COMPANIES: ({ commit }, { term }) => api.searchCompanies({ term }).then((companies) => {
    commit('SET_SEARCHED_COMPANIES', companies.rows);
    commit('SET_TOTAL_SEARCHED_COMPANIES', companies.total);
  }),

  FETCH_COMPANIES: ({ commit }, {
    search,
    character,
    type,
    page,
    perPage,
  }) => api.fetchCompaniesByPage(page, perPage, { search, character, type }).then((result) => {
    const { rows: pageCompanies, count: numCompanies } = result;

    commit('SET_NUM_TOTAL_COMPANIES', numCompanies);
    commit('SET_COMPANIES', pageCompanies);
  }),

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

      return api.fetchCompanyOpinionsByPage(id, page, perPage).then((result) => {
        const { rows: pageOpinions, count: numOpinions } = result;

        commit('SET_NUM_TOTAL_OPINIONS', numOpinions);
        commit('SET_OPINIONS', pageOpinions);
      });
    });
  },

  RATE_COMPANY: ({ commit, state }, { id, rating }) => api.rateCompany({
    id,
    rating,
  }).then((response) => {
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
};
