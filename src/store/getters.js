import _ from 'lodash';

export default {
  opinions(state) {
    return _.values(state.opinions);
  },

  numTotalOpinions(state) {
    return state.numTotalOpinions;
  },

  date(state) {
    return state.date;
  },

  adjacentDates(state) {
    return state.adjacentDates;
  },

  olderDate(state) {
    return state.olderDate;
  },

  newerDate(state) {
    return state.newerDate;
  },

  user(state) {
    return state.user;
  },

  loggedIn(state) {
    return !!state.user.email;
  },

  adFree(state) {
    return state.user.ad_free;
  },

  shouldShowAd(state) {
    return state.user.loaded && !state.user.ad_free;
  },

  shouldShowTopAndWorstExperts(state) {
    const { loaded, admin, premium } = state.user;
    return loaded && (admin || premium);
  },

  topPicks(state) {
    return state.topPicks;
  },

  trendingStocks(state) {
    return state.trendingStocks;
  },

  discoverPosts(state) {
    return state.discoverPosts;
  },

  latestExperts(state) {
    return state.latestExperts;
  },

  newestExperts(state) {
    return state.newestExperts;
  },

  newestCompanies(state) {
    return state.newestCompanies;
  },

  blogPosts(state) {
    return state.blogPosts;
  },

  latestComment(state) {
    return state.latestComment;
  },

  marketCallGuests(state) {
    return state.marketCallGuests;
  },

  premiumCompanies(state) {
    return state.premiumCompanies;
  },

  topExperts(state) {
    return state.topExperts;
  },

  worstExperts(state) {
    return state.worstExperts;
  },

  experts(state) {
    return state.experts;
  },

  numTotalExperts(state) {
    return state.numTotalExperts;
  },

  searchedExperts(state) {
    return state.searchedExperts;
  },

  disqusComments(state) {
    return state.disqusComments;
  },

  company(state) {
    return state.company;
  },

  expert(state) {
    return state.expert;
  },

  expertTopPicks(state) {
    return state.expertTopPicks;
  },

  expertJoinDate(state) {
    return state.expertJoinDate;
  },

  companies(state) {
    return state.companies;
  },

  numTotalCompanies(state) {
    return state.numTotalCompanies;
  },

  searchedCompanies(state) {
    return state.searchedCompanies;
  },
};
