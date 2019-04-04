<template>
  <div class="guests">
    <h1 class="guests__title">Latest Stock Opinions and Top Picks from Market Call Guests</h1>

    <market-call-guest
      v-for="(guest, index) in marketCallGuests"
      :key="guest.expert.id"
      :guest="guest"
      :discover-post="discoverPosts[index]"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarketCallGuest from './MarketCallGuest.vue'

export default {
  name: 'HomeMarketCallGuests',

  components: {
    MarketCallGuest
  },

  computed: {
    ...mapGetters([ 'marketCallGuests', 'discoverPosts' ])
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
