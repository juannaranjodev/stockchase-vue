import Vue from 'vue';
import expertMutations from './expert';
import companyMutations from './company';

export default {
  ...expertMutations,
  ...companyMutations,

  SET_OPINIONS: (state, opinions = []) => {
    opinions.forEach((opinion) => {
      if (opinion) {
        Vue.set(state.opinions, opinion.id, opinion);
      }
    });
  },

  UPDATE_OPINION: (state, opinion = {}) => {
    Vue.set(state.opinions, opinion.id, opinion);
  },

  SET_NUM_TOTAL_OPINIONS: (state, numTotalOpinions = 1) => {
    Vue.set(state, 'numTotalOpinions', numTotalOpinions);
  },

  SET_DATE: (state, date) => {
    Vue.set(state, 'date', date);
  },

  SET_ADJACENT_DATES: (state, date) => {
    Vue.set(state, 'adjacentDates', date);
  },

  SET_OLDER_DATE: (state, date) => {
    Vue.set(state, 'olderDate', date);
  },

  SET_NEWER_DATE: (state, date) => {
    Vue.set(state, 'newerDate', date);
  },

  SET_USER: (state, user = {}) => {
    Vue.set(user, 'loaded', true);
    Vue.set(state, 'user', user);
  },

  SET_TOP_PICKS: (state, topPicks = []) => {
    Vue.set(state, 'topPicks', topPicks);
  },

  SET_TRENDING_STOCKS: (state, trendingStocks = []) => {
    Vue.set(state, 'trendingStocks', trendingStocks);
  },

  SET_DISCOVER_POSTS: (state, discoverPosts = []) => {
    Vue.set(state, 'discoverPosts', discoverPosts);
  },

  SET_LATEST_EXPERTS: (state, latestExperts = []) => {
    Vue.set(state, 'latestExperts', latestExperts);
  },

  SET_NEWEST_EXPERTS: (state, newestExperts = []) => {
    Vue.set(state, 'newestExperts', newestExperts);
  },

  SET_NEWEST_COMPANIES: (state, newestCompanies = []) => {
    Vue.set(state, 'newestCompanies', newestCompanies);
  },

  SET_BLOG_POSTS: (state, blogPosts = []) => {
    Vue.set(state, 'blogPosts', blogPosts);
  },

  SET_LATEST_COMMENT: (state, latestComment = {}) => {
    Vue.set(state, 'latestComment', latestComment);
  },

  SET_MARKET_CALL_GUESTS: (state, marketCallGuests = []) => {
    Vue.set(state, 'marketCallGuests', marketCallGuests);
  },

  SET_PREMIUM_COMPANIES: (state, premiumCompanies = []) => {
    Vue.set(state, 'premiumCompanies', premiumCompanies);
  },

  SET_DISQUS_COMMENTS: (state, disqusComments = []) => {
    Vue.set(state, 'disqusComments', disqusComments);
  },

  SET_COMPANY: (state, company = {}) => {
    Vue.set(state, 'company', company);
  },

  SET_EXPERT: (state, expert = {}) => {
    Vue.set(state, 'expert', expert);
  },

  SET_EXPERT_TOP_PICKS: (state, expertTopPicks = []) => {
    Vue.set(state, 'expertTopPicks', expertTopPicks);
  },

  SET_EXPERT_RATING_OVERVIEW_SUMMARY: (state, expertRatingOverviewSummary) => {
    Vue.set(state, 'expertRatingOverviewSummary', expertRatingOverviewSummary);
  },

  SET_EXPERT_TOP_PICKS_HAVING_PERFORMANCE: (state, topPicksHavingPerformance) => {
    Vue.set(state, 'expertTopPicksHavingPerformance', topPicksHavingPerformance);
  },

  SET_EXPERT_JOIN_DATE: (state, expertJoinDate) => {
    Vue.set(state, 'expertJoinDate', expertJoinDate);
  },
};
