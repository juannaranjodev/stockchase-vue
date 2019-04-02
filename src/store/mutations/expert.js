import Vue from 'vue'

export default {
  SET_TOP_EXPERTS: (state, topExperts=[]) => {
    state.topExperts = topExperts
  },

  SET_WORST_EXPERTS: (state, worstExperts=[]) => {
    state.worstExperts = worstExperts
  },
}
