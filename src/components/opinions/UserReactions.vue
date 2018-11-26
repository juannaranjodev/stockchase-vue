<template>
  <div class="opinion-ratings">
    <div
      v-for="rating in ratingCounts"
      :key="`rating_${rating.rating}`"
      class="opinion-rating"
    >
      <img
        :src="ratingImageFor(rating.rating)"
        width="50"
        @click="rate(rating.rating)">
      <span>{{ rating.count }}</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as c from '../../constants'
import { getPossibleRatings, getRatingImage } from '../../util/rating'

export default {
  name: 'OpinionUserReactions',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
  },

  data() {
    return {
      possibleRatings: getPossibleRatings(),
    }
  },

  computed: {
    counts() {
      return _.countBy(this.item.SocialRatings, 'rating')
    },

    ratingCounts() {
      return _.map(this.possibleRatings, rating => ({
        rating,
        count: this.counts[rating] || 0
      }))
    }
  },

  methods: {
    rate(rating) {
      this.$store.dispatch('RATE_OPINION', { id: this.item.id, rating }).catch(err => {
        if (err.status === 401) {
          window.location = `${c.APP_URL}/member/login`
          return
        }

        alert(`Opps, an error happened: "${err.statusText || err.status}". Please contact us.`)
      })
    },

    ratingImageFor(rating) {
      return getRatingImage(rating)
    },
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
