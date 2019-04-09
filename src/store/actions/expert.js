import api from '../../api'

export default {
  FETCH_TOP_OR_WORST_EXPERTS: ({ commit, dispatch, state }, isTop) => {
    return api.fetchTopOrWorstExperts(isTop)
      .then(experts => {
        const actionName = isTop ? 'SET_TOP_EXPERTS' : 'SET_WORST_EXPERTS'
        commit(actionName, experts)
      })
  },

  FETCH_EXPERTS_TOTAL_BY_CHARACTER: ({ commit, dispatch, state }, { character, type = 'L' }) => {
    return api.getExpertsTotalByCharacter(character, type)
    .then(total => {
      commit('SET_TOTAL_EXPERTS', total)
    })
  },

  FETCH_EXPERTS_BY_CHARACTER: ({ commit, dispatch, state }, { character, type = 'L', page = 1, limit = 15 }) => {
    return api.getExpertsByFirstCharacter(character, type, page, limit)
      .then(({ experts }) => {
        experts = _.map(experts, (expert, i) => {
          return {
            ...expert,
            url: generateExpertLink(expert)
          };
        })
        commit('SET_EXPERTS', experts)
      })
  },

  SEARCH_EXPERTS: ({ commit, dispatch, state }, { term }) => {
    return api.searchExperts({ term })
      .then(experts => {
        experts.rows = _.map(experts.rows, (expert, i) => {
          return {
            ...expert,
            url: generateExpertLink(expert)
          };
        })
        commit('SET_SEARCHED_EXPERTS', experts.rows)
        commit('SET_TOTAL_SEARCHED_EXPERTS', experts.total)
      })
  },

  FETCH_EXPERTS_BY_NAME: ({ commit, dispatch, state }, { term, page = 1, limit = 15}) => {
    return api.getExpertsByName(term, page, limit)
      .then(({ experts }) => {
        experts = _.map(experts, (expert, i) => {
          return {
            ...expert,
            url: generateExpertLink(expert)
          };
        })
        commit('SET_EXPERTS', experts)
      })
  },

  FETCH_TOTAL_EXPERTS: ({ commit, dispatch, state }, { term = null } ) => {
    return api.getTotalExperts(term)
      .then(total => {
        commit('SET_TOTAL_EXPERTS', total)
      })
  },

  FETCH_EXPERTS: ({ commit, dispatch, state }, { page = 1, limit = 15}) => {
    return api.getExpertsByPage(page, limit)
      .then(({ experts }) => {
        experts = _.map(experts, (expert, i) => {
          return {
            ...expert,
            url: generateExpertLink(expert)
          };
        })
        commit('SET_EXPERTS', experts)
      })
  },
}
