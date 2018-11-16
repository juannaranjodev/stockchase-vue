<template>
  <div class="opinion-ratings">
    <div
      v-for="rating in possibleRatings"
      class="opinion-rating"
    >
      <img :src="ratingImageFor(rating)" width="50" @click="rate(rating)">
      <span>{{ numRatingsFor(rating) }}</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getPossibleRatings, getRatingImage } from '../../util/rating'

export default {
  name: 'opinion-user-reactions',
  props: ['item'],
  serverCacheKey: ({ item: { id } }) => {
    return `opinion::${id}::user_reactions`
  },

  data() {
    return {
      possibleRatings: getPossibleRatings(),
      counts: _.countBy(this.item.SocialRatings, 'rating'),
    }
  },

  methods: {
    rate(rating) {
      this.$store.dispatch('RATE_OPINION', { id: this.item.id, rating }).then(() => {
        console.log('rate success')
      })
    },

    ratingImageFor(rating) {
      return getRatingImage(rating)
    },

    numRatingsFor(rating) {
      return this.counts[rating] || 0
    }
  },
}
</script>

<style lang="stylus" scoped>
.opinion-rating
  margin-left 8px
  margin-right 8px
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
    margin 0 -5px

  &:hover
    cursor pointer
    opacity 1
    color #09f

  span
    margin-left 6px
    font-size 16px
</style>
