<template>
  <div class="home-container">
    <div class="container">
      <div class="overview">
        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <discover />
            </div>
            <div class="overview-section__block">
              <market-call />
            </div>
          </div>

          <div class="overview-section__right">
            <div class="overview-section__block">
              <sign-up />
            </div>

            <div class="overview-section__block">
              <premium />
            </div>
          </div>
        </div>

        <div class="overview-section overview-section--with-ad">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <in-the-news />
            </div>
          </div>

          <div class="overview-section__right d-none d-md-block">
            <div class="overview-section__block">
              <side-ad />
            </div>
          </div>
        </div>
      </div>

      <link-ad />
    </div>

    <div class="home-divider" />

    <div class="container">
      <market-call-guests />
      <market-outlook />

      <dianomi-ad />
      <link-ad class="d-none d-md-block" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Discover from '../components/home/Discover.vue'
import MarketCall from '../components/home/MarketCall.vue'
import MarketCallGuests from '../components/home/MarketCallGuests.vue'
import MarketOutlook from '../components/home/MarketOutlook.vue'
import SignUp from '../components/home/SignUp.vue'
import Premium from '../components/home/Premium.vue'
import InTheNews from '../components/home/InTheNews.vue'
import LinkAd from '../components/ads/LinkAd.vue'
import SideAd from '../components/ads/SideAd.vue'
import DianomiAd from '../components/ads/DianomiAd.vue'

export default {
  name: 'Home',

  components: {
    Discover,
    MarketCall,
    MarketCallGuests,
    MarketOutlook,
    SignUp,
    Premium,
    InTheNews,
    LinkAd,
    DianomiAd,
    SideAd,
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
  padding 0 20px
  margin 0 auto

  &:not(:first-child)
    padding-top 15px

.home-divider
  background-color #D9D9D9
  height 2px
  width 100%

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
        flex 1
        width auto

      .overview-section__right
        width 300px
        margin-left 40px
        flex-shrink 0

    &__block
      width 100%

      &:not(:last-child):not(:only-child)
        margin-bottom 15px

</style>
