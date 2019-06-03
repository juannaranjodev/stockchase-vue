<template>
  <five-star-rating
    v-if="rating > 0"
    :rating="rating"
    :title="`Score: ${formattedRating}\nTotal wins: ${totalWins}\nTotal loses: ${totalLoses}`"
  />
  <span
    v-else
    class="no-rating"
  >Expert rating not available.</span>
</template>

<script>
import FiveStarRating from './FiveStarRating.vue';

export default {
  name: 'ExpertRating',

  components: { FiveStarRating },

  props: {
    rating: {
      type: Number,
      default: 0,
    },
    totalWins: {
      type: Number,
      default: 0,
    },
    totalLoses: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    formattedRating() {
      return this.$options.filters.round(this.rating);
    },
  },
};
</script>

<style lang="stylus" scoped>
.no-rating
  color #8990A5
  font-size 13px
  font-weight normal
</style>
