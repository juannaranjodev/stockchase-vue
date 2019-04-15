import Vue from 'vue';

export default {
  SET_TOP_EXPERTS: (state, topExperts = []) => {
    Vue.set(state, 'topExperts', topExperts);
  },

  SET_WORST_EXPERTS: (state, worstExperts = []) => {
    Vue.set(state, 'worstExperts', worstExperts);
  },

  SET_TOTAL_SEARCHED_EXPERTS: (state, total = 0) => {
    Vue.set(state, 'totalSearchedExperts', total);
  },

  SET_SEARCHED_EXPERTS: (state, experts = []) => {
    Vue.set(state, 'searchedExperts', experts);
  },

  SET_TOTAL_EXPERTS: (state, total = 0) => {
    Vue.set(state, 'totalExperts', total);
  },

  SET_EXPERTS: (state, experts = []) => {
    Vue.set(state, 'experts', experts);
  },
};
