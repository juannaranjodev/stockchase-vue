import Vue from 'vue';

export default {
  SET_COMPANIES: (state, companies = []) => {
    Vue.set(state, 'companies', companies);
  },

  SET_NUM_TOTAL_COMPANIES: (state, total = 0) => {
    Vue.set(state, 'numTotalCompanies', total);
  },

  SET_TOTAL_SEARCHED_COMPANIES: (state, total = 0) => {
    Vue.set(state, 'totalSearchedCompanies', total);
  },

  SET_SEARCHED_COMPANIES: (state, companies = []) => {
    Vue.set(state, 'searchedCompanies', companies);
  },
};
