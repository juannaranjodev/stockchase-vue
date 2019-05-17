<template>
  <div class="container">
    <cards-view-filters
      :title="title"
      :search-placeholder="searchPlaceholder"
      target-search="experts"
      :reset-uri="'/expert'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
    />

    <div
      v-if="shouldShowAd"
      class="ad-banner clear"
    >
      <div>
        <p>
          <!-- eslint-disable max-len -->
          <strong>Browse all <a href="/expert">experts</a></strong> and read their opinions on <a href="/company">public companies</a>. Read the daily stock market experts opinions and discover the latest<a href="/">stock predictions</a> and <a href="/opinions/recent">top picks</a>.
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

    <div class="experts">
      <div class="first-row">
        <card-view
          v-for="(expert, index) in firstFiveExperts"
          :key="index"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="`${expert.title} at ${expert.company}`"
          :footnote="`${expert.total_opinion} opinions`"
          :social-links="expert.social_links || {}"
          :card-link="expert.url"
          :rating="expert.rating"
          :total-wins="expert.totalWins"
          :total-loses="expert.totalLoses"
        />
      </div>

      <in-feed-ad />

      <div class="second-row">
        <card-view
          v-for="(expert, index) in theRestOfExperts"
          :key="index"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="`${expert.title} at ${expert.company}`"
          :footnote="`${expert.total_opinion} opinions`"
          :social-links="expert.social_links || {}"
          :card-link="expert.url"
          :rating="expert.rating"
          :total-wins="expert.totalWins"
          :total-loses="expert.totalLoses"
        />
      </div>
    </div>
    <paginator
      :type="paginator.type"
      :sort="paginator.sort"
      :direction="paginator.direction"
      :total-items="totalExperts"
      :items-per-page="paginator.itemsPerPage"
      :main="'/expert'"
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
  name: 'Experts',

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

  title() {
    return 'Stock Experts Index — Stockchase';
  },

  data() {
    const { params } = this.$route;

    return {
      title: 'Stock Experts',
      searchPlaceholder: 'Filter by expert name',
      paginator: {
        type: params.type ? params.type : 'F',
        sort: params.sort ? params.sort : 'FirstName',
        direction: params.direction ? params.direction : 'desc',
        itemsPerPage: Number(params.itemsPerPage) || 15,
      },
    };
  },

  computed: {
    ...mapGetters(['experts', 'totalExperts', 'shouldShowAd']),

    firstFiveExperts() {
      return this.experts.length < 5 ? this.experts : this.experts.slice(0, 5);
    },
    theRestOfExperts() {
      return this.experts.length >= 5 ? this.experts.slice(5) : [];
    },
  },

  asyncData({ store, route }) {
    const { params, query } = route;
    const {
      page, itemsPerPage, character, type,
    } = params;

    let promises = null;

    if (Object.keys(query).length > 0) { // if doing a search query
      promises = [
        store.dispatch('FETCH_EXPERTS_BY_NAME', {
          term: decodeURI(query.search),
          page: page ? Number(page) : 1,
          limit: itemsPerPage ? Number(itemsPerPage) : 15,
        }),
        store.dispatch('FETCH_TOTAL_EXPERTS', { term: decodeURI(query.search) }),
      ];
    } else if (character) {
      promises = [
        store.dispatch('FETCH_EXPERTS_BY_CHARACTER', {
          character,
          type,
          page: page ? Number(page) : 1,
          limit: itemsPerPage ? Number(itemsPerPage) : 15,
        }),
        store.dispatch('FETCH_EXPERTS_TOTAL_BY_CHARACTER', {
          character,
          type,
        }),
      ];
    } else {
      promises = [
        store.dispatch('FETCH_EXPERTS', {
          page: page ? Number(page) : 1,
          limit: itemsPerPage ? Number(itemsPerPage) : 15,
        }),
        store.dispatch('FETCH_TOTAL_EXPERTS', { term: null }),
      ];
    }

    return promises ? Promise.all(promises) : null;
  },
};
</script>

<style lang="stylus" scoped>
  @import '../assets/css/global.css';
  .container
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px 20px
    margin 0 auto
  .experts
    margin-top 20px
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
