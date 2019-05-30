<template>
  <div class="expert-container">
    <leaderboard-ad :ad-slot="slots.ExpertLeaderboard" />

    <div class="container">
      <div class="overview">
        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <expert-overview />
            </div>
          </div>

          <div class="overview-section__right">
            <div class="overview-section__block">
              <expert-top-picks />
            </div>
          </div>
        </div>
      </div>

      <b-tabs
        id="expert_tabs"
        v-model="tabIndex"
        nav-class="expert-tabs"
        @input="onTabChange"
      >
        <b-tab>
          <expert-header />
          <link-ad :ad-slot="slots.ExpertLink" />

          <div class="opinions-container">
            <opinions-list
              :items="opinions"
              :chart-enabled="true"
            />

            <number-pagination
              :num-total-items="numTotalOpinions"
              :num-page-items="opinions.length"
              :url-pattern="`/expert/view/:id/sort/:sortBy/page/:page/direction/:direction/max/:perPage`"
              :url-params="urlParams"
            />
          </div>

          <template slot="title">
            <div class="expert-tab">
              Expert Opinions
            </div>
          </template>
        </b-tab>

        <b-tab>
          <user-reactions
            :item="expert"
            type="expert"
          />
          <div class="expert-comments">
            <vue-disqus
              :shortname="disqusShortName"
              :identifier="disqusIdentifier"
              :url="absoluteUrl"
            />
          </div>

          <template slot="title">
            <div class="expert-tab">
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
          <div class="expert-tab--right">
            <div style="display: none">
              <div ref="reactionsTooltip">
                <user-reactions
                  :item="expert"
                  type="expert"
                />
              </div>
            </div>

            <div
              ref="userReactions"
              :class="{ 'expert-rating': true, 'no-rating': !myRating }"
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
      <footer-link-ad :ad-slot="slots.ExpertFooterLink" />
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

import ExpertHeader from '../components/Expert/Header.vue';
import ExpertOverview from '../components/Expert/Overview.vue';
import ExpertTopPicks from '../components/Expert/TopPicks.vue';
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import FooterLinkAd from '../components/Ads/FooterLinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
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
  name: 'Expert',

  components: {
    ExpertHeader,
    ExpertOverview,
    ExpertTopPicks,
    LeaderboardAd,
    LinkAd,
    FooterLinkAd,
    DianomiAd,
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
    ...mapGetters(['user', 'expert', 'opinions', 'numTotalOpinions', 'shouldShowAd']),
    slots: () => slots,

    urlParams() {
      return this.getUrlParams(this.$route);
    },

    title() {
      return this.expert.name;
    },

    disqusIdentifier() {
      return md5(this.absoluteUrl);
    },

    disqusShortName() {
      return c.DISQUS_SHORTNAME;
    },

    absoluteUrl() {
      return `${this.origin}${this.expert.url}`;
    },

    myRating() {
      const ratings = this.expert.SocialRatings || [];
      if (!ratings.length) return null;

      return _.find(ratings, { user_id: this.user.id });
    },

    myRatingImage() {
      return getRatingImage(this.myRating.rating);
    },

    numSameRatings() {
      const { myRating } = this;
      if (!myRating) return null;

      const ratings = this.expert.SocialRatings || [];
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
    return store.dispatch('FETCH_EXPERT', this.methods.getUrlParams(route));
  },

  title() {
    return `Stock Opinions by ${this.title}`;
  },

  previewTitle() {
    return `${this.title} — Stock Opinions Archive`;
  },

  image() {
    return this.expert.avatar;
  },

  description() {
    const latestOpinion = this.opinions[0];

    return latestOpinion ? stripTags(latestOpinion.comment) : null;
  },

  mounted() {
    this.origin = window.location.origin;

    this.$bus.$on('showExpertComments', () => {
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
    this.$bus.$off('showExpertComments');
    this.destroyTippy();
  },

  methods: {
    getUrlParams(route) {
      const {
        id,
        slug,
        sortBy = 'date',
        direction = 'desc',
        page,
        perPage,
      } = route.params;

      return {
        id,
        slug,
        sortBy,
        direction,
        page: Number(page) || 1,
        perPage: Number(perPage) || 15,
      };
    },

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
      window.scrollTo(0, document.getElementById('expert_tabs').offsetTop - spacerHeight);
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

<style lang="stylus">
@import '~assets/css/chart.scss'
</style>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

.overview
  &-section
    margin-bottom 30px
    margin-top 30px
    display flex
    align-items stretch
    flex-wrap nowrap
    justify-content space-between

    &__left, &__right
      display flex
      align-items stretch

    &__left
      flex 1
      flex-grow 1
      flex-shrink 1

    &__right
      width 60%
      margin-left 10px
      flex-grow 0
      flex-shrink 0

    &__block
      width 100%
      padding 15px
      border-radius 5px
      box-shadow 0 4px 14px rgba(black, 0.14)

.expert
  &-container
    >>> .expert-tab
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
      display block

      &__left, &__right
        width 100%
        margin 0

      &__left
        margin-bottom 30px

      &__block
        margin-bottom 0

</style>
