<template>
  <div class="expert-container">
    <div class="container">
      <div class="overview">
        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <expert-overview />
            </div>
          </div>

          <div class="overview-section__right overview-section__right--small">
            <div class="overview-section__block">
              <review-expert />
            </div>
          </div>
        </div>

        <div class="overview-section overview-section--with-ad">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <expert-top-picks />
            </div>
          </div>

          <div
            v-if="shouldShowAd"
            class="overview-section__right d-none d-lg-block"
          >
            <div class="overview-section__block">
              <side-ad />
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
          <link-ad />

          <div class="opinions-container">
            <opinions-list :items="opinions" />
            <div class="opinions-count">
              Showing {{ startPosition }} to {{ endPosition }} of {{ numTotalOpinions }} entries
            </div>
            <link-ad class="d-none d-lg-block" />
            <number-pagination
              :num-total-pages="numOpinionPages"
              :current-page="currentPage"
              :url-pattern="urlPattern"
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
      <link-ad class="d-none d-lg-block" />
    </div>
  </div>
</template>

<script>
/* global DISQUSWIDGETS */
import { mapGetters } from 'vuex';
import _ from 'lodash';
import md5 from 'md5';

import * as c from '../constants';
import { stripTags } from '../util/filters';
import { getRatingImage } from '../util/rating';
import EventBus from '../util/EventBus';

import ExpertHeader from '../components/Expert/Header.vue';
import ExpertOverview from '../components/Expert/Overview.vue';
import ExpertTopPicks from '../components/Expert/TopPicks.vue';
import ReviewExpert from '../components/Expert/Review.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import SideAd from '../components/Ads/SideAd.vue';
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
    LinkAd,
    DianomiAd,
    SideAd,
    OpinionsList,
    NumberPagination,
    UserReactions,
    ReviewExpert,
  },

  data() {
    return {
      origin: '',
      tabIndex: 0,
    };
  },

  computed: {
    ...mapGetters(['user', 'expert', 'opinions', 'numTotalOpinions', 'shouldShowAd']),

    title() {
      return this.expert.name;
    },

    currentPage() {
      return +this.$route.params.page || 1;
    },

    perPage() {
      return +this.$route.params.perPage || 15;
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
      return `/expert/view/${this.expert.id}/sort/date/page/:page/direction/desc/max/${this.perPage}`;
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
    return store.dispatch('FETCH_EXPERT', {
      id: route.params.id,
      name: route.params.name,
      page: +route.params.page,
      perPage: +route.params.perPage,
    });
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

  created() {
    EventBus.$on('showExpertComments', () => {
      this.tabIndex = 1;

      this.scrollToTabs();
    });
  },

  mounted() {
    this.origin = window.location.origin;

    this.$nextTick(() => {
      this.initTippy();
      this.onRouteHashChange(this.routeHash);

      if (typeof DISQUSWIDGETS !== 'undefined') DISQUSWIDGETS.getCount({ reset: true });
    });
  },

  beforeDestroy() {
    EventBus.$off('showExpertComments');
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

    &--with-ad
      margin-top 40px
      border-top 2px solid #E9E9EA

      .overview-section__right .overview-section__block
        padding-top 10px

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

      &--small
        width 200px

    &__block
      width 100%

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
      display flex
      flex-direction column-reverse
      align-items center

      &__left, &__right
        width 100%
        margin 0

      &__block
        margin-bottom 25px

</style>
