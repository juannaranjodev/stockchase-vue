import api from '../../api'

export default {
  FETCH_TOP_OR_WORST_EXPERTS: ({ commit, dispatch, state }, isTop) => {
    return api.fetchTopOrWorstExperts(isTop)
      .then(experts => {
        const actionName = isTop ? 'SET_TOP_EXPERTS' : 'SET_WORST_EXPERTS'
        commit(actionName, experts)
      })
  }
}
