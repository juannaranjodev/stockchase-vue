import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      opinions: {},
      numTotalOpinions: 1,
      date: null,
      adjacentDates: [],
      olderDate: null,
      newerDate: null,
      user: {},
      topPicks: [],
      trendingStocks: [],
      discoverPosts: [],
      latestExperts: [],
      newestExperts: [],
      newestCompanies: [],
      blogPosts: [],
      latestComment: {},
      marketCallGuests: [],
      premiumCompanies: [],
      topExperts: [],
      worstExperts: [],
      experts: [],
      numDisqusComments: 0,
      totalExperts: 0,
      searchedExperts: [],
      totalSearchedExperts: 0,

      // For single company page
      // TODO consider moving single company page data to a module
      company: {},
    },
    actions,
    mutations,
    getters,
  });
}
