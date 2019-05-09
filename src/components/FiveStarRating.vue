<template>
  <div
    v-b-tooltip.hover
    class="star-rating"
    :title="title"
  >
    <img
      v-for="(count, index) in countWhole"
      :key="`whole-star-${index}`"
      src="~assets/images/stars/star_whole.png"
    >
    <img
      v-if="hasHalf"
      src="~assets/images/stars/star_half.png"
    >
    <img
      v-for="(count, index) in countEmpty"
      :key="`empty-star-${index}`"
      src="~assets/images/stars/star_empty.png"
    >
  </div>
</template>

<script>
export default {
  name: 'FiveStarRating',

  props: {
    rating: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    countWhole() {
      return Math.floor(this.rating);
    },

    hasHalf() {
      return this.rating % 1 > 0;
    },

    countEmpty() {
      return 5 - Math.ceil(this.rating);
    },
  },
};
</script>

<style lang="stylus" scoped>
.star-rating
  display: flex

  img
    width 13px
    height 13px
    margin-right 4px
</style>
