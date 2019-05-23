<template>
  <div class="company-container">
    <leaderboard-ad :ad-slot="slots.CompanyLeaderboard" />

    <div class="container">
      <div class="overview">
        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <company-overview />
            </div>
          </div>

          <div class="overview-section__right">
            <div class="overview-section__block">
              <join-discussion />
            </div>
          </div>
        </div>

        <div class="overview-section overview-section--with-ad">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <company-chart />
            </div>
          </div>

          <div
            v-if="shouldShowAd"
            class="overview-section__right d-none d-lg-block"
          >
            <div class="overview-section__block">
              <side-square-ad :ad-slot="slots.CompanySideSquare" />
            </div>
          </div>
        </div>

        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <company-about />
            </div>
          </div>

          <div class="overview-section__right">
            <div class="overview-section__block">
              <company-links />
            </div>
          </div>
        </div>
      </div>

      <b-tabs
        id="company_tabs"
        v-model="tabIndex"
        nav-class="company-tabs"
        @input="onTabChange"
      >
        <b-tab>
          <company-header />
          <link-ad :ad-slot="slots.CompanyLink" />

          <div class="opinions-container">
            <opinions-list :items="opinions" />

            <div class="opinions-count">
              Showing {{ startPosition | formatNumber }} to {{ endPosition | formatNumber }}
              of {{ numTotalOpinions | formatNumber }} entries
            </div>

            <link-ad :ad-slot="slots.CompanyLink" />

            <number-pagination
              :num-total-pages="numOpinionPages"
              :current-page="currentPage"
              :url-pattern="urlPattern"
            />
          </div>

          <template slot="title">
            <div class="company-tab">
              Expert Opinions
            </div>
          </template>
        </b-tab>

        <b-tab>
          <user-reactions
            :item="company"
            type="company"
          />
          <div class="company-comments">
            <vue-disqus
              :shortname="disqusShortName"
              :identifier="disqusIdentifier"
              :url="absoluteUrl"
            />
          </div>

          <template slot="title">
            <div class="company-tab">
              <img
                src="~assets/svgs/comment_icon.svg"
                width="20"
              >
              <span
                class="disqus-comment-count"
                :data-disqus-url="absoluteUrl"
              >0 Comments</span>
            </div>
          </template>
        </b-tab>

        <template slot="tabs">
          <div class="company-tab--right">
            <div style="display: none">
              <div ref="reactionsTooltip">
                <user-reactions
                  :item="company"
                  type="company"
                />
              </div>
            </div>

            <div
              ref="userReactions"
              :class="{ 'company-rating': true, 'no-rating': !myRating }"
            >
              <img
                v-if="myRating"
                :src="myRatingImage"
                width="35"
              >
              <img
                v-else
                src="~assets/images/smileys/smiley-glasses.png"
                width="25"
              >
              <span v-if="myRating">You, and {{ numSameRatings }} Others</span>
              <span v-else>Your Reaction</span>
            </div>
          </div>
        </template>
      </b-tabs>

      <dianomi-ad />
      <footer-link-ad :ad-slot="slots.CompanyFooterLink" />
    </div>
  </div>
</template>

<script>
/* global DISQUSWIDGETS */
import { mapGetters } from 'vuex';
import _ from 'lodash';
import md5 from 'md5';

import { slots } from '../components/Ads/config';
import * as c from '../constants';
import { stripTags } from '../util/filters';
import { getRatingImage } from '../util/rating';

import CompanyHeader from '../components/Company/Header.vue';
import CompanyOverview from '../components/Company/Overview.vue';
import CompanyAbout from '../components/Company/About.vue';
import CompanyLinks from '../components/Company/Links.vue';
import CompanyChart from '../components/Company/Chart.vue';
import JoinDiscussion from '../components/Company/JoinDiscussion.vue';
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import SideSquareAd from '../components/Ads/SideSquareAd.vue';
import OpinionsList from '../components/Opinions/List.vue';
import NumberPagination from '../components/NumberPagination.vue';
import UserReactions from '../components/UserReactions.vue';

// TODO this is ugly
let tippy;
if (process.browser) {
  /* eslint-disable-next-line global-require */
  tippy = require('tippy.js').default;
}

export default {
  name: 'Company',

  components: {
    CompanyHeader,
    CompanyOverview,
    CompanyAbout,
    CompanyLinks,
    CompanyChart,
    JoinDiscussion,
    LeaderboardAd,
    LinkAd,
    FooterLinkAd,
    DianomiAd,
    SideSquareAd,
    OpinionsList,
    NumberPagination,
    UserReactions,
  },

  data() {
    return {
      origin: '',
      tabIndex: 0,
    };
  },

  computed: {
    ...mapGetters(['user', 'company', 'opinions', 'numTotalOpinions', 'shouldShowAd']),
    slots: () => slots,

    title() {
      return `${this.company.name} (${this.company.symbol})`;
    },

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
      return `/company/view/${this.company.id}/sort/date/page/:page/direction/desc/max/${this.perPage}`;
    },

    disqusIdentifier() {
      return md5(this.absoluteUrl);
    },

    disqusShortName() {
      return c.DISQUS_SHORTNAME;
    },

    absoluteUrl() {
      return `${this.origin}${this.company.url}`;
    },

    myRating() {
      const ratings = this.company.SocialRatings || [];
      if (!ratings.length) return null;

      return _.find(ratings, { user_id: this.user.id });
    },

    myRatingImage() {
      return getRatingImage(this.myRating.rating);
    },

    numSameRatings() {
      const { myRating } = this;
      if (!myRating) return null;

      const ratings = this.company.SocialRatings || [];
      return _.countBy(ratings, 'rating')[myRating.rating] - 1;
    },

    routeHash() {
      return this.$route.hash;
    },
  },

  watch: {
    myRating() {
      this.resetTippy();
    },

    routeHash(hash) {
      this.onRouteHashChange(hash);
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_COMPANY', {
      id: route.params.id,
      symbol: route.params.symbol,
      page: +route.params.page,
      perPage: +route.params.perPage,
    });
  },

  title() {
    return `Buy, Sell or Hold: ${this.title} — Stock Predictions`;
  },

  previewTitle() {
    return this.title;
  },

  image() {
    return this.company.logo;
  },

  description() {
    const latestOpinion = this.opinions[0];

    return latestOpinion ? stripTags(latestOpinion.comment) : null;
  },

  mounted() {
    this.origin = window.location.origin;
    this.$bus.$on('showCompanyComments', () => {
      this.tabIndex = 1;

      this.scrollToTabs();
    });

    this.$nextTick(() => {
      this.initTippy();
      this.onRouteHashChange(this.routeHash);

      if (typeof DISQUSWIDGETS !== 'undefined') DISQUSWIDGETS.getCount({ reset: true });
    });
  },

  beforeDestroy() {
    this.$bus.$off('showCompanyComments');
    this.destroyTippy();
  },

  methods: {
    onTabChange(tabIndex) {
      if (tabIndex === 1) {
        // Trigger window resize to adjust the disqus comments height
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      }
    },

    onRouteHashChange(hash) {
      // Sync anchor with tab
      if (!hash || hash === '#opinions') {
        this.tabIndex = 0;
      } else if (hash === '#comments') {
        this.tabIndex = 1;
      }

      if (hash) this.scrollToTabs();
    },

    scrollToTabs() {
      // Account for mobile spacer
      const spacerHeight = document.getElementsByClassName('sticky-header-spacer')[0].offsetHeight;
      window.scrollTo(0, document.getElementById('company_tabs').offsetTop - spacerHeight);
    },

    initTippy() {
      tippy(this.$refs.userReactions, {
        content: this.$refs.reactionsTooltip,
        interactive: true,
        theme: 'stockchase',
        animateFill: false,
        distance: 5,
      });
    },

    destroyTippy() {
      /* eslint-disable no-underscore-dangle */
      if (this.$refs.userReactions && this.$refs.userReactions._tippy) {
        this.$refs.userReactions._tippy.destroy();
      }
      /* eslint-enable no-underscore-dangle */
    },

    resetTippy() {
      this.destroyTippy();
      this.initTippy();
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

.opinions-count
  color black
  margin 5px 0

.overview
  &-section
    margin-bottom 30px
    margin-top 30px
    display flex
    align-items flex-start
    flex-wrap nowrap
    justify-content space-between

    &__left, &__right
      width calc(50% - 15px/2)
      flex-grow 0
      flex-shrink 0

    &__left
      flex 1

    &__right
      width 300px
      margin-left 40px
      flex-shrink 0

    &__block
      width 100%

.company
  &-container
    >>> .company-tab
      display flex
      align-items center
      color #495057
      font-size 18px
      margin 5px 0

      &--right
        display flex
        align-items center
        justify-content flex-end
        flex 1

      &s
        position relative
        margin-bottom 25px
        display flex
        flex-wrap nowrap

      img
        margin-right 3px
        margin-top 2px

  &-rating
    color #06c
    display flex
    align-items center
    font-size 15px

    &.no-rating
      img
        opacity 0.6

    &:hover
      cursor pointer
      color #09f

      img
        opacity 1 !important

    span
      margin-left 10px

  &-comments
    margin 20px 0

@media (max-width 991px)
  .container
    padding 0 10px

  .overview
    &-section
      display flex
      flex-direction column-reverse
      align-items center

      &__left, &__right
        width 100%
        margin 0

      &__block
        margin-bottom 25px

</style>
