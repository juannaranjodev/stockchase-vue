<template>
  <div class="container">
    <div class="overview">
      <div class="overview-section">
        <div class="overview-section__left">
          <div class="overview-section__block">
            <discover />
          </div>
          <div class="overview-section__block">
            <h1>STOCK PICKS @MARKETCALL</h1>
          </div>
        </div>

        <div class="overview-section__right">
          <div class="overview-section__block">
            <h1>Sign up now</h1>
          </div>

          <div class="overview-section__block">
            <h1>Best stock ideas</h1>
          </div>
        </div>
      </div>

      <div class="overview-section overview-section--with-ad">
        <div class="overview-section__left">
          <div class="overview-section__block">
            <h1>STOCKS IN THE NEWS</h1>
          </div>
        </div>

        <div class="overview-section__right d-none d-md-block">
          <div class="overview-section__block">
            <h1>Ads</h1>
          </div>
        </div>
      </div>

    </div>

    <opinions-link-ad />
    <h1>Latest Stock Opinions and Top Picks from Market Call Guests</h1>
    <hr>
    <h1>TODAY'S MARKET OUTLOOK</h1>
    <hr>
    <opinions-dianomi-ad />
    <opinions-link-ad class="d-none d-md-block" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Discover from '../components/home/Discover.vue'
import OpinionsLinkAd from '../components/opinions/LinkAd.vue'
import OpinionsDianomiAd from '../components/opinions/DianomiAd.vue'

export default {
  name: 'Home',

  components: {
    Discover,
    OpinionsLinkAd,
    OpinionsDianomiAd,
  },

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_DAILY_OPINIONS', {
      type: 'opinions',
      date: 'recent',
    })
  },

  title () {
    return 'Expert Opinions on Stock Trading'
  },

  computed: {
    ...mapGetters([ 'shouldShowAd', 'adFree' ]),
  },
}
</script>

<style lang="stylus" scoped>

.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto

.overview
  &-section
    margin-bottom 30px
    margin-top 30px
    display flex
    align-items flex-end
    flex-wrap nowrap
    justify-content space-between

    &__left, &__right
      width calc(50% - 15px/2)
      flex-grow 0
      flex-shrink 0

    &--with-ad
      .overview-section__left
        flex-grow 1
        flex 1
        width auto

      .overview-section__right
        width 300px
        margin-left 40px

    &__block
      height 300px
      width 100%
      background-color rgba(0,0,0,0.1)

      &:not(:last-child):not(:only-child)
        margin-bottom 15px

</style>
