import api from '../../api';

export default {
  FETCH_COMPANIES: ({ commit }, {
    search,
    character,
    type,
    page,
    perPage,
  }) => api.fetchCompaniesByPage(page, perPage, { search, character, type }).then((result) => {
    // console.log('--------------params', page, perPage, search, character, type);
    console.log('--------------rows', result.rows.length, result.count);
    console.log('--------------first row', result.rows[0].toJSON());
    // console.log('--------------first row', result.length, result[0].toJSON());
    // console.log('--------------first row', result.length);
    const { rows: pageCompanies, count: numCompanies } = result;

    commit('SET_TOTAL_COMPANIES', numCompanies);
    commit('SET_COMPANIES', pageCompanies);
  }),

  FETCH_TOTAL_COMPANIES: ({ commit }, {
    term = null,
  }) => api.getTotalCompanies(term).then((total) => {
    commit('SET_TOTAL_COMPANIES', total);
  }),

  FETCH_COMPANIES_BY_NAME: ({ commit }, {
    term,
    page = 1,
    limit = 15,
  }) => api.getCompaniesByTerm(term, page, limit).then((companies) => {
    commit('SET_COMPANIES', companies);
  }),

  SEARCH_COMPANIES: ({ commit }, { term }) => api.searchCompanies({ term }).then((companies) => {
    commit('SET_SEARCHED_COMPANIES', companies.rows);
    commit('SET_TOTAL_SEARCHED_COMPANIES', companies.total);
  }),

  FETCH_COMPANIES_TOTAL_BY_CHARACTER: ({ commit }, {
    character,
    type = 'L',
  }) => api.getCompaniesTotalByCharacter(character, type).then((total) => {
    commit('SET_TOTAL_COMPANIES', total);
  }),

  FETCH_COMPANIES_BY_CHARACTER: ({ commit }, {
    character,
    type = 'L',
    page = 1,
    limit = 15,
  }) => api.getCompaniesByFirstCharacter(character, type, page, limit).then((companies) => {
    commit('SET_COMPANIES', companies);
  }),
};
