<template>
  <div class="companies-container">
    <leaderboard-ad :ad-slot="slots.CompaniesLeaderboard" />

    <div class="container">
      <mobile-wealthica-video class="d-lg-none" />

      <cards-view-filters
        title="Public Companies"
        search-placeholder="Filter by name or symbol"
        target-search="companies"
        :reset-uri="'/company'"
        :pattern="`/company/index/:character/:type/desc/:sortBy/page/1/direction/:direction/max/:perPage`"
        :current-limit="urlParams.perPage"
      />

      <triple-ads>
        <strong>Browse all <a href="/company">public companies</a></strong> recently reviewed by
        <a href="/expert">stock experts</a>.
        Read the daily stock experts opinions and <a href="/">stock predictions</a>.
      </triple-ads>

      <link-ad :ad-slot="slots.CompaniesLink" />

      <div
        v-if="companies.length"
        class="companies-list card-view-list"
      >
        <div
          v-for="(item, index) in displayedItems"
          :key="index"
          :class="{ 'card-view-container': true, 'card-view-container--ad': item.ad }"
        >
          <in-feed-ad
            v-if="item.ad"
            :ad-slot="slots.CompaniesInFeed"
          />
          <card-view
            v-else
            image-size="large"
            :image-src="item.logo"
            :name="item.name"
            :title="item.name"
            :sub-title="`${item.symbol}`"
            :footnote="`${item.opinions_count} opinions`"
            :card-link="item.url"
          />
        </div>
      </div>
      <div v-else>
        <p class="text-center">
          No matching companies.
        </p>
      </div>

      <number-pagination
        :num-total-items="numTotalCompanies"
        :num-page-items="companies.length"
        :current-page="urlParams.page"
        :per-page="urlParams.perPage"
        :search="urlParams.search"
        :url-pattern="`/company/index/${urlParams.character}/${urlParams.type}/desc/${urlParams.sortBy}/page/:page/direction/${urlParams.direction}/max/${urlParams.perPage}`"
      />

      <dianomi-ad />
      <footer-link-ad :ad-slot="slots.CompaniesFooterLink" />
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
import InFeedAd from '../components/Ads/InFeedAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import TripleAds from '../components/Ads/TripleAds.vue';
import MobileWealthicaVideo from '../components/Ads/MobileWealthicaVideo.vue';

export default {
  name: 'Companies',

  components: {
    CardsViewFilters,
    CardView,
    NumberPagination,
    LeaderboardAd,
    LinkAd,
    InFeedAd,
    FooterLinkAd,
    DianomiAd,
    TripleAds,
    MobileWealthicaVideo,
  },

  data() {
    return { adIndex: 0 };
  },

  computed: {
    ...mapGetters(['companies', 'numTotalCompanies', 'shouldShowAd']),
    slots: () => slots,

    urlParams() {
      return this.getUrlParams(this.$route);
    },

    displayedItems() {
      if (!this.shouldShowAd || this.adIndex === 0) return this.companies;

      const displayedItems = _.clone(this.companies);
      displayedItems.splice(this.adIndex, 0, { ad: true });

      return displayedItems;
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_COMPANIES', this.methods.getUrlParams(route));
  },

  title() {
    return 'Company Index';
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
        type = 'C',
        sortBy = 'name',
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
        perPage: Number(perPage) || 60,
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

.companies-list
  margin-top 20px

  >>> .card-info
    min-height 224px // TODO put card-related styling in the separate company cardview component
  >>> .card-picture
    background-color white

@media (max-width 991px)
  .container
    padding 0 10px

</style>
