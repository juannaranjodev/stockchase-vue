<template>
  <div class="home-container">
    <div class="container">
      <div class="overview">
        <div class="overview-section d-none d-lg-flex">
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

          <div class="overview-section__right">
            <div class="overview-section__block">
              <side-ad class="d-none d-lg-block" />
              <div class="intro d-lg-none">
                Stockchase compiles comments that experts make about stocks every day and helps you review how companies are thought of by investment experts. Sign up to get the latest news by email.
              </div>
            </div>
          </div>
        </div>
      </div>

      <link-ad />
    </div>

    <div class="home-divider d-none d-lg-block" />

    <div class="container">
      <market-call-guests class="d-none d-lg-block" />
      <market-outlook class="d-none d-lg-block" />

      <div class="opinions-container d-lg-none">
        <opinions-list />
        <div class="opinions__actions">
          <a href="/opinions/recent">
            <img src="~assets/images/more.png">
            <span>Show 25 More</span>
          </a>

          <a href="/opinions/recent">
            <img src="~assets/images/table.png">
            <span>Opinions Table</span>
          </a>
        </div>
      </div>

      <sponsors class="d-lg-none" />
      <newest class="d-lg-none" />
      <follow-us class="d-lg-none" />

      <dianomi-ad />
      <link-ad class="d-none d-lg-block" />
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
import Sponsors from '../components/home/Sponsors.vue'
import Newest from '../components/home/Newest.vue'
import FollowUs from '../components/home/FollowUs.vue'
import LinkAd from '../components/ads/LinkAd.vue'
import SideAd from '../components/ads/SideAd.vue'
import DianomiAd from '../components/ads/DianomiAd.vue'
import OpinionsList from '../components/opinions/List.vue'

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
    OpinionsList,
    Sponsors,
    Newest,
    FollowUs,
  },

  asyncData ({ store, route }) {
    const queries = [
      // Top discover posts
      store.dispatch('FETCH_DISCOVER_POSTS'),
      // STOCK PICKS @MARKETCALL
      store.dispatch('FETCH_LATEST_EXPERTS', 3),
      // Mobile opinions listing
      store.dispatch('FETCH_DAILY_OPINIONS', {
        type: 'opinions',
        date: 'recent',
      }),
    ]

    return Promise.all(queries)
  },

  title () {
    return 'Expert Opinions on Stock Trading'
  },
}
</script>

<style lang="stylus">
.home-divider
  border-top 1px dashed #E9E9EA
  margin 25px 0
</style>

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

.intro
  margin-bottom 30px

.opinions
  &-container
    margin-bottom 80px

  &__actions
    display flex
    align-items center
    justify-content center

    a
      display flex
      align-items center
      text-transform uppercase
      text-decoration none
      color #CCC
      font-size 12px

      &:not(:first-child)
        margin-left 25px

      img
        margin-right 10px

@media (max-width 991px)
  .container
    padding 0 10px

  .overview
    &-section
      &--with-ad
        display flex
        flex-direction column-reverse
        align-items center

        .overview-section__left, .overview-section__right
          width 100%
          margin 0

</style>
