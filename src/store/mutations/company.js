import Vue from 'vue';

export default {
  SET_COMPANIES: (state, companies = []) => {
    Vue.set(state, 'companies', companies);
  },

  SET_TOTAL_COMPANIES: (state, total = 0) => {
    Vue.set(state, 'totalCompanies', total);
  },

  SET_TOTAL_SEARCHED_COMPANIES: (state, total = 0) => {
    Vue.set(state, 'totalSearchedCompanies', total);
  },

  SET_SEARCHED_COMPANIES: (state, companies = []) => {
    Vue.set(state, 'searchedCompanies', companies);
  },
};
