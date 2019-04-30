import api from '../../api';

export default {
  FETCH_COMPANIES: ({ commit }, { page = 1, limit = 25 }) => api.getCompaniesWithOpinions(page, limit)
    .then((companies) => {
      commit('SET_COMPANIES', companies);
    }),

  FETCH_TOTAL_COMPANIES: ({ commit }, { term = null }) => api.getTotalCompanies(term)
    .then((total) => {
      commit('SET_TOTAL_COMPANIES', total);
    }),

  FETCH_COMPANIES_BY_NAME: ({ commit }, { term, page = 1, limit = 15 }) => api.getCompaniesByName(term, page, limit)
    .then((companies) => {
      console.log(companies);
      commit('SET_COMPANIES', companies);
    }),

  SEARCH_COMPANIES: ({ commit }, { term }) => api.searchCompanies({ term })
    .then((companies) => {
      commit('SET_SEARCHED_COMPANIES', companies.rows);
      commit('SET_TOTAL_SEARCHED_COMPANIES', companies.total);
    }),
};
