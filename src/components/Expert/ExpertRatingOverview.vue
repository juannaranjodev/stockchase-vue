<template>
  <div class="expert-overview">
    <div class="expert-overview__content">
      <div class="expert-logo">
        <img
          :src="expert.avatar"
          width="50"
          height="50"
        >
      </div>
      <div class="expert-meta">
        <div class="expert-meta__content">
          <div class="expert-meta__left">
            <a
              class="expert-name"
              :href="expert.url"
            >
              {{ expert.name }}
            </a>

            <div class="expert-top-picks">
              {{ countTopPicksAnalyzed }} TOP PICKS
            </div>
          </div>

          <div class="expert-meta__right">
            <a
              class="review-expert"
              :href="expert.url"
            >
              <img
                src="~assets/svgs/star.svg"
                width="13"
              >
              <span>Review</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="expert-overview__feedback">
      <div class="expert-comments">
        <img
          src="~assets/svgs/message.svg"
          width="23"
          height="22"
        >
        <span class="expert-overview__feedback-text">0 comments</span>
      </div>
      <div class="expert-reactions">
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
            width="24"
          >
          <img
            v-else
            src="~assets/images/smileys/smiley-glasses.png"
            width="24"
          >
          <span
            v-if="myRating"
            class="expert-overview__feedback-text"
          >You, and {{ numSameRatings }} Others</span>
          <span
            v-else
            class="expert-overview__feedback-text"
          >
            Your Reaction
          </span>
        </div>
      </div>
    </div>
    <div class="expert-overview__description">
      <p class="expert-overview__description-text">
        We analyzed {{ countTopPicksAnalyzed }}
        top picks opinion from {{ expert.name }}.
      </p>
      <p class="expert-overview__description-text">
        Jon Case made {{ count2YearsTopPicksAnalyzed }}
        top picks covering {{ countCompanies2YearsTopPicksAnalyzed }}
        companies that can be analyzed for a 2 year investing horizon.
      </p>
      <!-- eslint-disable max-len -->
      <p
        class="expert-overview__calculate-link"
      >
        <span id="ratingCalculated">How is the rating calculated?</span>
      </p>
      <b-tooltip
        target="ratingCalculated"
        placement="bottomright"
        class="rating-calculated-tooltip"
      >
        Star rating is based on the most wins in the investing horizon. If the expert has the mostly BIG WIN (+20% Gain) he gets 5 stars, mostly WIN (3% to 20% Gain) he gets 4 star, mostly Neutral (-3% to 3% Gain/Loss) he gets 3 stars, mostly LOSS (-20% to -3%) he gets 2 stars and mostly BIG LOSS (> -20% loss) he gets 1 star.
      </b-tooltip>
      <!-- eslint-enable max-len -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import { getRatingImage } from '../../util/rating';
import UserReactions from '../UserReactions.vue';

// TODO this is ugly
let tippy;
if (process.browser) {
  /* eslint-disable-next-line global-require */
  tippy = require('tippy.js').default;
}

export default {
  name: 'ExpertRatingOverview',

  components: {
    UserReactions,
  },

  props: {
    countTopPicksAnalyzed: {
      type: Number,
      default: 0,
    },
    count2YearsTopPicksAnalyzed: {
      type: Number,
      default: 0,
    },
    countCompanies2YearsTopPicksAnalyzed: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters(['user', 'expert']),

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
  },

  watch: {
    myRating() {
      this.resetTippy();
    },
  },

  beforeDestroy() {
    this.destroyTippy();
  },

  methods: {
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
  .expert
    &-overview
      &__content
        display flex
        align-items flex-start
        border-bottom 1px solid #EEF1F7
        padding-bottom 15px
      &__feedback
        display flex
        justify-content space-around
        padding 12px
      &__feedback-text
        color #2B3440
        opacity 0.35
        font-size 13px
        font-weight bold
        margin-left 12px
      &__description
        padding 8px 8px 4px
        background-color rgba(236, 237, 240, 0.55)
      &__description-text
        font-size 12px
        font-weight bold
        line-height 14px
        color #2B3440
        opacity 0.45
        margin-bottom 4px
      &__calculate-link
        color #FF4135
        font-size 12px
        font-weight bold
        line-height 14px
        margin-bottom 4px
    &-logo
      width 50px
      height 50px
      margin 0 20px 0 0
      display flex
      align-items center
      border-radius 70px
      box-shadow 0 2px 4px rgba(black, 0.5)

      img
        border-radius 70px
        box-shadow 0 10px 21px rgba(black, 0.11)


    &-meta
      flex 1

      &__content
        display flex
        align-items flex-start
        justify-content space-between
        margin-top 4px

      &__left
        flex 1

      &__right
        margin-left 10px

    &-name
      font-size 18px
      color #25292B
      font-weight bold
      line-height 22px
      &:hover
        cursor pointer

    &-top-picks
      opacity 0.35
      font-size 14px
      font-weight bold

  .review-expert
    color white
    text-decoration none
    background-color #FF5030
    display flex
    align-items center
    text-align center
    border-radius 4px
    height 40px
    padding 0 15px
    font-size 15px
    font-weight bold
    line-height normal

    img
      margin-right 8px

    &:hover
      background-color #FF2E50

  @media (max-width 767px)
    .expert
      &-meta
        &__content
          display block

        &__right
          margin-left 0
          margin-top 20px
</style>

<style lang="stylus">
.tooltip
  .tooltip-inner
    max-width 800px !important
</style>
