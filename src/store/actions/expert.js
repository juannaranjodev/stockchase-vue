import api from '../../api';

export default {
  FETCH_TOP_OR_WORST_EXPERTS: ({ commit }, isTop) => api.fetchTopOrWorstExperts(isTop)
    .then((experts) => {
      const actionName = isTop ? 'SET_TOP_EXPERTS' : 'SET_WORST_EXPERTS';
      commit(actionName, experts);
    }),

  SEARCH_EXPERTS: ({ commit }, { term }) => api.searchExperts({ term })
    .then((experts) => {
      commit('SET_SEARCHED_EXPERTS', experts.rows);
      commit('SET_TOTAL_SEARCHED_EXPERTS', experts.total);
    }),

  FETCH_EXPERTS: ({ commit }, {
    search,
    character,
    type,
    page,
    perPage,
  }) => api.fetchExpertsByPage(page, perPage, { search, character, type }).then((result) => {
    const { rows: pageExperts, count: numExperts } = result;

    commit('SET_NUM_TOTAL_EXPERTS', numExperts);
    commit('SET_EXPERTS', pageExperts);
  }),

  FETCH_EXPERT: ({ commit }, urlParams) => {
    const {
      id, slug, page, perPage, original,
    } = urlParams;

    // Redirect not found paths to expert index according to v1 expert controller logic
    if (!/^\d+$/.test(id)) return Promise.reject({ url: '/expert' });

    return api.fetchExpertById(id).then((expert) => {
      if (!expert) return Promise.reject({ url: '/expert' });

      // Redirect urls with wrong slugs to the canonical url
      if (!original.page && slug !== expert.slug) {
        return Promise.reject({ url: expert.url });
      }

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
