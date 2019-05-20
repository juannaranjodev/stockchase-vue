<template>
  <div class="container">
    <cards-view-filters
      :title="title"
      :search-placeholder="searchPlaceholder"
      target-search="companies"
      :reset-uri="'/company'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
      :current-limit="paginator.itemsPerPage"
    />

    <div
      v-if="shouldShowAd"
      class="ad-banner clear"
    >
      <div>
        <p>
          <!-- eslint-disable max-len -->
          <strong>Browse all <a href="/company">public companies</a></strong> recently reviewed by <a href="/expert">stock experts</a>. Read the daily stock experts opinions and <a href="/">stock predictions</a>.
          <!-- eslint-enable max-len -->
        </p>
      </div>
      <div class="banner-options">
        <unlock-expert-ratings />
        <what-is-wealthica />
        <ask-peter-hodson />
      </div>
    </div>

    <link-ad />

    <div class="companies">
      <div class="first-row">
        <card-view
          v-for="(company, index) in firstFiveCompanies"
          :key="index"
          image-size="large"
          :image-src="company.logo"
          :name="company.name"
          :title="company.name"
          :sub-title="`${company.symbol}`"
          :footnote="`${company.total_opinion} opinions`"
          :card-link="company.url"
        />
      </div>

      <in-feed-ad />

      <div class="second-row">
        <card-view
          v-for="(company, index) in theRestOfCompanies"
          :key="index"
          image-size="large"
          :image-src="company.logo"
          :name="company.name"
          :title="company.name"
          :sub-title="`${company.symbol}`"
          :footnote="`${company.total_opinion} opinions`"
          :card-link="company.url"
        />
      </div>
    </div>
    <paginator
      :type="paginator.type"
      :sort="paginator.sort"
      :direction="paginator.direction"
      :total-items="totalCompanies"
      :items-per-page="paginator.itemsPerPage"
      :main="'/company'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CardView from '../components/CardView.vue';
import CardsViewFilters from '../components/CardsViewFilters.vue';
import Paginator from '../components/Paginator.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import InFeedAd from '../components/Ads/InFeedAd.vue';
import UnlockExpertRatings from '../components/Ads/UnlockExpertRatings.vue';
import WhatIsWealthica from '../components/Ads/WhatIsWealthica.vue';
import AskPeterHodson from '../components/Ads/AskPeterHodson.vue';

export default {
  name: 'Companies',

  components: {
    CardsViewFilters,
    CardView,
    Paginator,
    LinkAd,
    InFeedAd,
    UnlockExpertRatings,
    WhatIsWealthica,
    AskPeterHodson,
  },

  data() {
    const { params } = this.$route;

    return {
      title: 'Public Companies',
      searchPlaceholder: 'Filter by name or symbol',
      paginator: {
        type: params.type ? params.type : 'C',
        sort: params.sort ? params.sort : 'name',
        direction: params.direction ? params.direction : 'desc',
        itemsPerPage: params.itemsPerPage ? params.itemsPerPage : 60,
      },
    };
  },

  computed: {
    ...mapGetters(['companies', 'totalCompanies', 'shouldShowAd']),

    firstFiveCompanies() {
      return this.companies.length < 5 ? this.companies : this.companies.slice(0, 5);
    },
    theRestOfCompanies() {
      return this.companies.length >= 5 ? this.companies.slice(5) : [];
    },
  },

  asyncData({ store, route }) {
    const {
      params, query,
    } = route;
    const {
      page, itemsPerPage, character,
      /* page, itemsPerPage, character, type, */
    } = params;

    let promises = null;

    if (Object.keys(query).length > 0) { // if doing a search query
      promises = [
        store.dispatch('FETCH_COMPANIES_BY_NAME', {
          term: decodeURI(query.search),
          page: page ? parseInt(page, 10) : 1,
          limit: itemsPerPage ? parseInt(itemsPerPage, 10) : 15,
        }),
        store.dispatch('FETCH_TOTAL_COMPANIES', { term: decodeURI(query.search) }),
      ];
    } else if (character) {
      // promises = [
      //   store.dispatch('FETCH_EXPERTS_BY_CHARACTER', {
      //     character: character,
      //     type: type,
      //     page: page ?  parseInt(page) : 1,
      //     limit: itemsPerPage ? parseInt(itemsPerPage) : 15,
      //   }),
      //   store.dispatch('FETCH_EXPERTS_TOTAL_BY_CHARACTER', {
      //     character: character,
      //     type: type,
      //   })
      // ]
    } else {
      promises = [
        store.dispatch('FETCH_COMPANIES', {
          page: page ? parseInt(page, 10) : 1,
          limit: itemsPerPage ? parseInt(itemsPerPage, 10) : 60,
        }),
        store.dispatch('FETCH_TOTAL_COMPANIES', { term: null }),
      ];
    }

    return promises ? Promise.all(promises) : null;
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
.ad-banner > div:first-child
  width 31%
  font-size 18px
  color #595959
  display inline-block
  p
    text-align center
    margin 0
    a
      color red
</style>
