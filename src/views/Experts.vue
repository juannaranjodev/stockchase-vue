<template>
  <div class="experts-container">
    <leaderboard-ad :ad-slot="slots.ExpertsLeaderboard" />

    <div class="container">
      <mobile-wealthica-video class="d-lg-none" />

      <cards-view-filters
        title="Stock Experts"
        search-placeholder="Filter by expert name"
        target-search="experts"
        :reset-uri="'/expert'"
        :pattern="`/expert/index/:character/:type/sort/:sortBy/page/1/direction/:direction/max/:perPage`"
        :current-limit="urlParams.perPage"
      />

      <triple-ads>
        <strong>Browse all <a href="/expert">experts</a></strong> and read their opinions on
        <a href="/company">public companies</a>.
        Read the daily stock market experts opinions and discover the latest
        <a href="/">stock predictions</a> and <a href="/opinions/recent">top picks</a>.
      </triple-ads>

      <link-ad :ad-slot="slots.ExpertsLink" />

      <div
        v-if="experts.length"
        class="experts-list card-view-list"
      >
        <div
          v-for="(item, index) in displayedItems"
          :key="index"
          :class="{ 'card-view-container': true, 'card-view-container--ad': item.ad }"
        >
          <in-feed-ad
            v-if="item.ad"
            :ad-slot="slots.ExpertsInFeed"
          />
          <card-view
            v-else
            image-size="small"
            :image-src="item.avatar"
            :name="item.name"
            :title="item.name"
            :sub-title="`${item.title} at ${item.company}`"
            :footnote="`${item.opinions_count} opinions`"
            :social-links="item.social_links || {}"
            :card-link="item.url"
            :rating="item.rating"
            :total-wins="item.totalWins"
            :total-loses="item.totalLoses"
            :rating-enabled="true"
          />
        </div>
      </div>
      <div v-else>
        <p class="text-center">
          No matching experts.
        </p>
      </div>

      <number-pagination
        :num-total-items="numTotalExperts"
        :num-page-items="experts.length"
        :current-page="urlParams.page"
        :per-page="urlParams.perPage"
        :search="urlParams.search"
        :url-pattern="`/expert/index/${urlParams.character}/${urlParams.type}/sort/${urlParams.sortBy}/page/:page/direction/${urlParams.direction}/max/${urlParams.perPage}`"
      />

      <dianomi-ad />
      <footer-link-ad :ad-slot="slots.ExpertsFooterLink" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import { slots } from '../components/Ads/config';

import CardView from '../components/CardView.vue';
import CardsViewFilters from '../components/CardsViewFilters.vue';
import NumberPagination from '../components/NumberPagination.vue';
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import InFeedAd from '../components/Ads/InFeedAd.vue';
import TripleAds from '../components/Ads/TripleAds.vue';
import MobileWealthicaVideo from '../components/Ads/MobileWealthicaVideo.vue';

export default {
  name: 'Experts',

  components: {
    CardsViewFilters,
    CardView,
    NumberPagination,
    LeaderboardAd,
    LinkAd,
    FooterLinkAd,
    DianomiAd,
    InFeedAd,
    TripleAds,
    MobileWealthicaVideo,
  },

  data() {
    return { adIndex: 0 };
  },

  computed: {
    ...mapGetters(['experts', 'numTotalExperts', 'shouldShowAd']),
    slots: () => slots,

    urlParams() {
      return this.getUrlParams(this.$route);
    },

    displayedItems() {
      if (!this.shouldShowAd || this.adIndex === 0) return this.experts;

      const displayedItems = _.clone(this.experts);
      displayedItems.splice(this.adIndex, 0, { ad: true });

      return displayedItems;
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_EXPERTS', this.methods.getUrlParams(route));
  },

  title() {
    return 'Stock Experts Index';
  },

  mounted() {
    this.$nextTick(() => {
      this.setAdIndex();
    });
  },

  methods: {
    getUrlParams(route) {
      const { query } = route;
      const {
        character = 'all',
        type = 'F',
        sortBy = 'FirstName',
        direction = 'desc',
        page,
        perPage,
      } = route.params;

      return {
        search: query.search ? decodeURI(query.search) : undefined,
        character,
        type,
        sortBy,
        direction,
        page: Number(page) || 1,
        perPage: Number(perPage) || 15,
      };
    },

    // Find an index to inject ad
    setAdIndex() {
      if (!this.shouldShowAd) return;

      const indexMapping = {
        '(min-width: 1200px)': 5,
        '(min-width: 992px) and (max-width: 1199px)': 4,
        '(min-width: 768px) and (max-width: 991px)': 3,
        '(min-width: 480px) and (max-width: 767px)': 2,
        '(max-width: 479px)': 1,
      };

      Object.keys(indexMapping).forEach((mediaQuery) => {
        if (window.matchMedia(mediaQuery).matches) {
          this.adIndex = indexMapping[mediaQuery];
        }
      });
    },
  },
};
</script>

<style lang="stylus">
@import '~assets/css/global.css'
@import '~assets/css/cardview.styl'
</style>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto

.experts-list
  margin-top 20px

@media (max-width 991px)
  .container
    padding 0 10px

</style>
