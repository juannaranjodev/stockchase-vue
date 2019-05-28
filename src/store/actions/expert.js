import api from '../../api';

export default {
  FETCH_TOP_OR_WORST_EXPERTS: ({ commit }, isTop) => api.fetchTopOrWorstExperts(isTop)
    .then((experts) => {
      const actionName = isTop ? 'SET_TOP_EXPERTS' : 'SET_WORST_EXPERTS';
      commit(actionName, experts);
    }),

  FETCH_EXPERTS_TOTAL_BY_CHARACTER: ({ commit }, {
    character,
    type = 'L',
  }) => api.getExpertsTotalByCharacter(character, type)
    .then((total) => {
      commit('SET_TOTAL_EXPERTS', total);
    }),

  FETCH_EXPERTS_BY_CHARACTER: ({ commit }, {
    character, type = 'L', page = 1, limit = 15,
  }) => api.getExpertsByFirstCharacter(character, type, page, limit)
    .then((experts) => {
      commit('SET_EXPERTS', experts);
    }),

  SEARCH_EXPERTS: ({ commit }, { term }) => api.searchExperts({ term })
    .then((experts) => {
      commit('SET_SEARCHED_EXPERTS', experts.rows);
      commit('SET_TOTAL_SEARCHED_EXPERTS', experts.total);
    }),

  FETCH_EXPERTS_BY_NAME: ({ commit }, {
    term,
    page = 1,
    limit = 15,
  }) => api.getExpertsByName(term, page, limit)
    .then(({ experts }) => {
      commit('SET_EXPERTS', experts);
    }),

  FETCH_TOTAL_EXPERTS: ({ commit }, { term = null }) => api.getTotalExperts(term)
    .then((total) => {
      commit('SET_TOTAL_EXPERTS', total);
    }),

  FETCH_EXPERTS: ({ commit }, { page = 1, limit = 15 }) => api.getExpertsByPage(page, limit)
    .then(({ experts }) => {
      commit('SET_EXPERTS', experts);
    }),

  FETCH_EXPERT: ({ commit }, urlParams) => {
    const {
      id, slug, page, perPage,
    } = urlParams;

    // Redirect not found paths to expert index according to v1 expert controller logic
    if (!/^\d+$/.test(id)) return Promise.reject({ url: '/expert' });

    return api.fetchExpertById(id).then((expert) => {
      if (!expert) return Promise.reject({ url: '/company' });

      // Redirect urls with wrong slugs to the canonical url
      if (!page && slug !== expert.slug) return Promise.reject({ url: expert.url, code: 301 });

      commit('SET_EXPERT', expert);

      return Promise.all([
        api.fetchExpertOpinionsByPage(id, page, perPage),
        api.fetchExpertTopPicks(id, 5),
        api.fetchExpertFirstOpinionDate(id),
      ]).then((result) => {
        const [{ rows: pageOpinions, count: numOpinions }, topPicks, firstOpinionDate] = result;

        commit('SET_NUM_TOTAL_OPINIONS', numOpinions);
        commit('SET_OPINIONS', pageOpinions);
        commit('SET_EXPERT_TOP_PICKS', topPicks);
        commit('SET_EXPERT_JOIN_DATE', firstOpinionDate);
      });
    });
  },
};
