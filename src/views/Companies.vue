<template>
  <div class="companies-container">
    <leaderboard-ad :ad-slot="slots.CompaniesLeaderboard" />

    <div class="container">
      <cards-view-filters
        title="Public Companies"
        search-placeholder="Filter by name or symbol"
        target-search="companies"
        :reset-uri="'/company'"
        :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:perPage'"
        :current-limit="paginator.perPage"
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

      <paginator
        :type="paginator.type"
        :sort="paginator.sort"
        :direction="paginator.direction"
        :total-items="totalCompanies"
        :per-page="paginator.perPage"
        :main="'/company'"
        :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:perPage'"
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
import Paginator from '../components/Paginator.vue';
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import InFeedAd from '../components/Ads/InFeedAd.vue';
import TripleAds from '../components/Ads/TripleAds.vue';

export default {
  name: 'Companies',

  components: {
    CardsViewFilters,
    CardView,
    Paginator,
    LeaderboardAd,
    LinkAd,
    FooterLinkAd,
    DianomiAd,
    InFeedAd,
    TripleAds,
  },

  data() {
    const { params } = this.$route;

    return {
      paginator: {
        type: params.type ? params.type : 'C',
        sort: params.sort ? params.sort : 'name',
        direction: params.direction ? params.direction : 'desc',
        perPage: Number(params.perPage) || 60,
      },
    };
  },

  computed: {
    ...mapGetters(['companies', 'totalCompanies', 'shouldShowAd']),
    slots: () => slots,

    firstFiveCompanies() {
      return this.companies.length <= 5 ? this.companies : this.companies.slice(0, 5);
    },
    theRestOfCompanies() {
      return this.companies.length > 5 ? this.companies.slice(5) : [];
    },
  },

  asyncData({ store, route }) {
    const { params, query } = route;
    const {
      page, perPage, character, type,
    } = params;

    return store.dispatch('FETCH_COMPANIES', {
      search: query.search ? decodeURI(query.search) : undefined,
      character,
      type,
      page: Number(page) || 1,
      perPage: Number(perPage) || 60,
    });

    // let promises = null;
    //
    // // TODO get companies list and count in the same query/call to get consistent results
    // if (query && query.search) { // if doing a search query
    //   promises = [
    //     store.dispatch('FETCH_COMPANIES_BY_NAME', {
    //       term: decodeURI(query.search),
    //       page: Number(page) || 1,
    //       limit: Number(perPage) || 15,
    //     }),
    //     store.dispatch('FETCH_TOTAL_COMPANIES', { term: decodeURI(query.search) }),
    //   ];
    // } else if (character) {
    //   promises = [
    //     store.dispatch('FETCH_COMPANIES_BY_CHARACTER', {
    //       character,
    //       type,
    //       page: Number(page) || 1,
    //       limit: Number(perPage) || 15,
    //     }),
    //     store.dispatch('FETCH_COMPANIES_TOTAL_BY_CHARACTER', {
    //       character,
    //       type,
    //     }),
    //   ];
    // } else {
    //   promises = [
    //     store.dispatch('FETCH_COMPANIES', {
    //       page: Number(page) || 1,
    //       limit: Number(perPage) || 60,
    //     }),
    //     store.dispatch('FETCH_TOTAL_COMPANIES', { term: null }),
    //   ];
    // }
    //
    // return promises ? Promise.all(promises) : null;
  },

  title() {
    return 'Company Index';
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

</style>
