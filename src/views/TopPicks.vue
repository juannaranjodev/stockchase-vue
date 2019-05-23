<template>
  <div class="company-container">
    <leaderboard-ad :ad-slot="slots.TopPicksLeaderboard" />

    <div class="container">
      <top-picks-header />

      <triple-ads>
        <strong>Browse all <a href="/company">public companies</a></strong> recently chosen as
        <a href="/opinions/recenttop">top picks</a> by <a href="/expert">stock experts</a>.
        Read the daily stock experts opinions and <a href="/">stock predictions</a>.
      </triple-ads>

      <link-ad :ad-slot="slots.TopPicksLink" />

      <div class="opinions-container">
        <opinions-list :items="opinions" />
        <div class="opinions-count">
          Showing {{ startPosition | round }} to {{ endPosition | round }}
          of {{ numTotalOpinions | round }} entries
        </div>

        <link-ad :ad-slot="slots.TopPicksLink" />

        <number-pagination
          :num-total-pages="numOpinionPages"
          :current-page="currentPage"
          :url-pattern="urlPattern"
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
    OpinionsList,
    NumberPagination,
  },

  computed: {
    ...mapGetters(['user', 'opinions', 'numTotalOpinions']),
    slots: () => slots,

    currentPage() {
      return Number(this.$route.params.page) || 1;
    },

    perPage() {
      return Number(this.$route.params.perPage) || 15;
    },

    numOpinionPages() {
      return Math.ceil(this.numTotalOpinions / this.perPage);
    },

    startPosition() {
      return (this.currentPage - 1) * this.perPage + 1;
    },

    endPosition() {
      return this.startPosition + this.opinions.length - 1;
    },

    urlPattern() {
      return `/opinions/recenttop/sort/date/page/:page/direction/desc/max/${this.perPage}`;
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_TOP_PICKS', {
      page: Number(route.params.page),
      perPage: Number(route.params.perPage),
    });
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
};
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

.opinions-count
  color black
  margin 5px 0

@media (max-width 991px)
  .container
    padding 0 10px

</style>
