<template>
  <five-star-rating
    :rating="rating"
    :title="
      rating > 0
        ? `Score: ${formattedRating}\nTotal wins: ${totalWins}\nTotal loses: ${totalLoses}`
        : 'Expert rating not available'
    "
  />
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
