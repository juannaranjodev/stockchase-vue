<template>
  <div class="guests">
    <h1 class="guests__title">Latest Stock Opinions and Top Picks from Market Call Guests</h1>

    <market-call-guest
      v-for="(guest, index) in guests"
      :key="guest.id"
      :index="index"
      :guest="guest"
    />

  </div>
</template>

<script>
import MarketCallGuest from './MarketCallGuest.vue'

export default {
  name: 'HomeMarketCallGuests',
  serverCacheKey: () => {
    return `home::market-call-guests`
  },

  components: {
    MarketCallGuest
  },

  data () {
    return {
      guests: [
        { id: 1 },
        { id: 2 },
        { id: 3, hasTopPicks: true, hasRating: true },
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
.guests
  padding 20px 0

  &__title
    font-size 1.7em
    margin-bottom 25px
    font-weight bold
    text-align center
    color #6D6868

</style>
