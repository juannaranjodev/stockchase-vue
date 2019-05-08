import api from '../../api';

export default {
  /* eslint-disable max-len */
  FETCH_COMPANIES: ({ commit }, { page = 1, limit = 25 }) => api.getCompaniesWithOpinions(page, limit)
  /* eslint-enable max-len */
    .then((companies) => {
      commit('SET_COMPANIES', companies);
    }),

  FETCH_TOTAL_COMPANIES: ({ commit }, { term = null }) => api.getTotalCompanies(term)
    .then((total) => {
      commit('SET_TOTAL_COMPANIES', total);
    }),
  /* eslint-disable max-len */
  FETCH_COMPANIES_BY_NAME: ({ commit }, { term, page = 1, limit = 15 }) => api.getCompaniesByTerm(term, page, limit)
  /* eslint-enable max-len */
    .then((companies) => {
      commit('SET_COMPANIES', companies);
    }),

  SEARCH_COMPANIES: ({ commit }, { term }) => api.searchCompanies({ term })
    .then((companies) => {
      commit('SET_SEARCHED_COMPANIES', companies.rows);
      commit('SET_TOTAL_SEARCHED_COMPANIES', companies.total);
    }),
};
