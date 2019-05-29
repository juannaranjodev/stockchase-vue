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
      numTotalOpinions: 0,
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
      disqusComments: [],

      // expert index
      numTotalExperts: 0,
      experts: [],
      searchedExperts: [],
      totalSearchedExperts: 0,

      // company index
      numTotalCompanies: 0,
      companies: [],
      searchedCompanies: [],
      totalSearchedCompanies: 0,

      // For company & expert profile page
      // TODO consider moving these data to separate modules
      company: {},
      expert: {},
      expertTopPicks: [],
      expertJoinDate: null,
    },
    actions,
    mutations,
    getters,
  });
}
