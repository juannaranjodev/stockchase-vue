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

      <div class="companies">
        <div
          v-if="firstFiveCompanies.length"
          class="first-row"
        >
          <card-view
            v-for="(company, index) in firstFiveCompanies"
            :key="index"
            image-size="large"
            :image-src="company.logo"
            :name="company.name"
            :title="company.name"
            :sub-title="`${company.symbol}`"
            :footnote="`${company.opinions_count} opinions`"
            :card-link="company.url"
          />
        </div>
        <div v-else>
          <p class="text-center">
            No matched companies.
          </p>
        </div>

        <in-feed-ad :ad-slot="slots.CompaniesInFeed" />

        <div
          v-if="theRestOfCompanies.length"
          class="second-row"
        >
          <card-view
            v-for="(company, index) in theRestOfCompanies"
            :key="index"
            image-size="large"
            :image-src="company.logo"
            :name="company.name"
            :title="company.name"
            :sub-title="`${company.symbol}`"
            :footnote="`${company.opinions_count} opinions`"
            :card-link="company.url"
          />
        </div>
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
  name: 'Companies',

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

  computed: {
    ...mapGetters(['companies', 'numTotalCompanies', 'shouldShowAd']),
    slots: () => slots,

    urlParams() {
      return this.getUrlParams(this.$route);
    },

    // TODO fixed 5 cards per row is bad for responsive display
    firstFiveCompanies() {
      return this.companies.length <= 5 ? this.companies : this.companies.slice(0, 5);
    },
    theRestOfCompanies() {
      return this.companies.length > 5 ? this.companies.slice(5) : [];
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_COMPANIES', this.methods.getUrlParams(route));
  },

  title() {
    return 'Company Index';
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
  },
};
</script>

<style lang="stylus">
@import '~assets/css/global.css'
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto
.companies
  margin-top 20px
  .card-info
    min-height 224px // TODO put card-related styling in the separate company cardview component
  .card-picture
    background-color white

  .first-row, .second-row
    display flex
    align-items flex-start
    flex-wrap wrap

</style>
