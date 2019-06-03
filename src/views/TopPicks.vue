<template>
  <div class="company-container">
    <leaderboard-ad :ad-slot="slots.TopPicksLeaderboard" />

    <div class="container">
      <mobile-wealthica-video class="d-lg-none" />

      <top-picks-header />

      <triple-ads class="triple-ads">
        <strong>Browse all <a href="/company">public companies</a></strong> recently chosen as
        <a href="/opinions/recenttop">top picks</a> by <a href="/expert">stock experts</a>.
        Read the daily stock experts opinions and <a href="/">stock predictions</a>.
      </triple-ads>

      <link-ad :ad-slot="slots.TopPicksLink" />

      <div class="opinions-container">
        <opinions-list :items="opinions" />

        <number-pagination
          :num-total-items="numTotalOpinions"
          :num-page-items="opinions.length"
          :url-pattern="`/opinions/recenttop/sort/:sortBy/page/:page/direction/:direction/max/:perPage`"
          :url-params="urlParams"
        />
      </div>

      <dianomi-ad />
      <footer-link-ad :ad-slot="slots.TopPicksFooterLink" />
    </div>
  </div>
</template>

<script>
/* global DISQUSWIDGETS */
import { mapGetters } from 'vuex';

import { slots } from '../components/Ads/config';
import TopPicksHeader from '../components/TopPicks/Header.vue';
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import TripleAds from '../components/Ads/TripleAds.vue';
import MobileWealthicaVideo from '../components/Ads/MobileWealthicaVideo.vue';
import OpinionsList from '../components/Opinions/List.vue';
import NumberPagination from '../components/NumberPagination.vue';

export default {
  name: 'TopPicks',

  components: {
    TopPicksHeader,
    LeaderboardAd,
    LinkAd,
    FooterLinkAd,
    DianomiAd,
    TripleAds,
    MobileWealthicaVideo,
    OpinionsList,
    NumberPagination,
  },

  computed: {
    ...mapGetters(['user', 'opinions', 'numTotalOpinions']),
    slots: () => slots,

    urlParams() {
      return this.getUrlParams(this.$route);
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_TOP_PICKS', this.methods.getUrlParams(route));
  },

  title() {
    return 'Best Stocks To Buy Today by Experts Opinion';
  },

  description() {
    return 'Expert opinions on best-performing stocks and what you should invest in today. Updated Daily.';
  },

  updated() {
    if (typeof DISQUSWIDGETS !== 'undefined') DISQUSWIDGETS.getCount({ reset: true });
  },

  methods: {
    getUrlParams(route) {
      const {
        sortBy = 'date',
        direction = 'desc',
        page,
        perPage,
      } = route.params;

      return {
        sortBy,
        direction,
        page: Number(page) || 1,
        perPage: Number(perPage) || 15,
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

.triple-ads
  margin-top -17px

@media (max-width 991px)
  .container
    padding 15px 10px

</style>
