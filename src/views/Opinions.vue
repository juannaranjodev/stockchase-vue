<template>
  <div class="opinions-container">
    <leaderboard-ad :ad-slot="slots.OpinionsLeaderboard" />

    <div class="container">
      <opinions-header :type="type" />

      <opinions-slider
        v-if="type === 'opinions'"
        :items="items"
        :page="currentPage"
      />

      <triple-ads v-if="type === 'toppicks'">
        <strong>Browse all <a href="/company">public companies</a></strong> recently chosen as
        <a href="/opinions/recenttop">top picks</a> by <a href="/expert">stock experts</a>.
        Read the daily stock experts opinions and <a href="/">stock predictions</a>.
      </triple-ads>

      <link-ad :ad-slot="slots.OpinionsLink" />

      <opinions-summary
        v-if="type === 'comments'"
        :items="items"
      />

      <div class="opinions-container">
        <date-pagination
          top
          :url-pattern="urlPattern"
          :num-date-items="items.length"
        />
        <opinions-list :items="pageItems" />
        <link-ad :ad-slot="slots.OpinionsLink" />
        <date-pagination
          bottom
          :url-pattern="urlPattern"
          :num-date-items="items.length"
        />
      </div>

      <dianomi-ad />
      <footer-link-ad :ad-slot="slots.OpinionsFooterLink" />
    </div>
  </div>
</template>

<script>
/* global DISQUSWIDGETS */
import { mapGetters } from 'vuex';
import { slots } from '../components/Ads/config';

import * as c from '../constants';
import OpinionsHeader from '../components/Opinions/Header.vue';
import OpinionsSlider from '../components/Opinions/Slider.vue';
import OpinionsSummary from '../components/Opinions/Summary.vue';
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import TripleAds from '../components/Ads/TripleAds.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import DatePagination from '../components/DatePagination.vue';
import OpinionsList from '../components/Opinions/List.vue';

export default {
  name: 'Opinions',

  components: {
    OpinionsHeader,
    LeaderboardAd,
    LinkAd,
    FooterLinkAd,
    TripleAds,
    OpinionsSlider,
    OpinionsSummary,
    DianomiAd,
    DatePagination,
    OpinionsList,
  },

  props: {
    type: {
      type: String,
      default: 'opinions',
    },
  },

  computed: {
    ...mapGetters(['opinions', 'adFree', 'user']),
    slots: () => slots,

    pageItems() {
      // Skip number paging & show all opinions for the date
      if (this.adFree) return this.items;

      const startIndex = (this.currentPage - 1) * c.PER_PAGE;
      return this.items.slice(startIndex, startIndex + c.PER_PAGE);
    },

    currentPage() {
      return +this.$route.params.page || 1;
    },

    items() {
      return this.opinions;
    },

    isOpinions() {
      return this.type === 'opinions';
    },

    urlPattern() {
      switch (this.type) {
        case 'comments': return '/opinions/market/:date';
        case 'toppicks': return '/opinions/recenttop/:date';
        default: return '/opinions/:date';
      }
    },

    routeHash() {
      return this.$route.hash || '';
    },
  },

  watch: {
    user(user) {
      if (!user.loaded) return;

      this.$nextTick(() => {
        this.scrollToOpinion();
      });
    },
  },

  updated() {
    if (typeof DISQUSWIDGETS !== 'undefined') DISQUSWIDGETS.getCount({ reset: true });
  },

  methods: {
    scrollToOpinion() {
      const opinionEl = document.getElementById(this.routeHash.replace('#', ''));
      if (!opinionEl) return;

      // Account for mobile spacer
      const spacerHeight = document.getElementsByClassName('sticky-header-spacer')[0].offsetHeight;
      window.scrollTo(0, opinionEl.offsetTop - spacerHeight);
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto

@media (max-width 991px)
  .container
    padding 0 10px

</style>
