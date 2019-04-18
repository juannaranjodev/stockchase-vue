import api from '../../api';

export default {
  FETCH_COMPANIES: ({ commit }, { page = 1, limit = 25 }) => api.getCompaniesWithOpinions(page, limit)
    .then(companies => {
      commit('SET_COMPANIES', companies);
    }),
  FETCH_TOTAL_COMPANIES: ({ commit }, { term = null }) => api.getTotalCompanies(term)
    .then(total => {
      commit('SET_TOTAL_COMPANIES', total);
    }),
};