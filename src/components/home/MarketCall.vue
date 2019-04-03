<template>
  <div class="market-call">
    <h2 class="market-call__title">STOCK PICKS @MARKETCALL</h2>
    <div class="market-call__testimonial">
      The only website on earth that has documented the stock picks and pans of every single guest who's appeared on BNN Market Call programs since the year 2000. — The Globe & Mail
    </div>
    <div class="market-call__experts">
      <a
        v-for="expert in latestExperts"
        :key="expert.id"
        class="market-call__expert"
        :href="expert.url"
      >
        <img
          :src="expert.avatar"
          :alt="expert.name"
          :title="expert.name"
          width="45"
          height="45"
        >
      </a>
      <a
        class="market-call__read-all"
        href="/opinions/recent"
      >Read all...</a>
    </div>

    <div class="market-call__links">
      <a
        class="market-call__link"
        href="/opinions/recent"
      >All recent opinions</a>
      <br>
      <a
        class="market-call__link"
        href="/opinions/market"
      >All recent market comments</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeMarketCall',

  computed: {
    ...mapGetters([ 'latestExperts' ]),
  },
}
</script>

<style lang="stylus" scoped>
.market-call
  background-color #FAFAFA
  border-radius 5px
  padding 20px 30px
  background-image url("~assets/images/market.png")
  background-position center top
  background-repeat no-repeat

  &__title
    font-weight bold
    text-transform uppercase
    color #020202
    font-size 24px
    margin-bottom 0.75em

  &__testimonial
    font-style italic
    font-size 18px
    color #888
    line-height normal

  &__expert
    margin-right 5px
    display flex
    align-items center

    img
      width 45px
      max-height 45px
      border-radius 5px
      background-color #DDD
      overflow hidden

    &s
      display flex
      align-items center
      margin 20px 0

  &__read-all
    color #888
    text-decoration none !important

  &__link
    color #1B475E
    font-size 22px
    font-weight bold
    text-decoration underline

</style>
