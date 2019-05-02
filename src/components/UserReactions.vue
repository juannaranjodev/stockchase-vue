<template>
  <div class="user-ratings">
    <div
      v-for="rating in ratingCounts"
      :key="`rating_${rating.rating}`"
      class="user-rating"
    >
      <img
        :src="ratingImageFor(rating.rating)"
        width="50"
        @click="rate(rating.rating)"
      >
      <span>{{ rating.count }}</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { getPossibleRatings, getRatingImage } from '../util/rating';

export default {
  name: 'UserReactions',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      possibleRatings: getPossibleRatings(),
    };
  },

  computed: {
    counts() {
      return _.countBy(this.item.SocialRatings, 'rating');
    },

    ratingCounts() {
      return _.map(this.possibleRatings, rating => ({
        rating,
        count: this.counts[rating] || 0,
      }));
    },

    rateActionName() {
      switch (this.type) {
        case 'opinion':
          return 'RATE_OPINION';
        case 'company':
          return 'RATE_COMPANY';
        case 'expert':
          return 'RATE_EXPERT';
        default:
          return null;
      }
    },
  },

  methods: {
    rate(rating) {
      this.$store.dispatch(this.rateActionName, { id: this.item.id, rating }).catch((err) => {
        /* eslint-disable-next-line no-alert */
        alert(`Oops, an error happened: "${err.statusText || err.status}". Please contact us.`);
      });
    },

    ratingImageFor(rating) {
      return getRatingImage(rating);
    },
  },
};
</script>

<style lang="stylus" scoped>
.user-rating
  margin 8px
  color #06c
  display flex
  flex-wrap nowrap
  align-items center
  opacity 0.8

  &s
    display flex
    align-items center
    justify-content center
    flex-wrap wrap
    margin -8px -5px

  &:hover
    cursor pointer
    opacity 1
    color #09f

  span
    margin-left 6px
    font-size 16px
</style>
