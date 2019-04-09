import Vue from 'vue'

export default {
  SET_TOP_EXPERTS: (state, topExperts=[]) => {
    state.topExperts = topExperts
  },

  SET_WORST_EXPERTS: (state, worstExperts=[]) => {
    state.worstExperts = worstExperts
  },

  SET_TOTAL_SEARCHED_EXPERTS: (state, total = 0) => {
    state.totalSearchedExperts = total;
  },

  SET_SEARCHED_EXPERTS: (state, experts = []) => {
    state.searchedExperts = experts;
  },

  SET_TOTAL_EXPERTS: (state, total = 0) => {
    state.totalExperts = total;
  },
  
  SET_EXPERTS: (state, experts=[]) => {
    state.experts = experts;
  },
}
