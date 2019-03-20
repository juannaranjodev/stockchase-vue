<template>
  <div class="home-container">
    <div
      class="ad-container d-none d-lg-block"
      v-if="shouldShowAd"
    >
      <div class="ad">
        <!-- Async AdSlot 8 for Ad unit 'stockchase.com_SiteWideHorizontalTop_Desktop_728x90_ATF_Flex' ### Size: [[728,90],'fluid'] -->
        <!-- Adslot's refresh function: googletag.pubads().refresh([gptadslots[7]]) -->
        <div id='div-gpt-ad-9004875-8' />
        <!-- End AdSlot 8 -->
      </div>
    </div>

    <div
      class="ad-container d-lg-none"
      v-if="shouldShowAd"
    >
      <Adsense
        class="ad"
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="3572899802"/>
    </div>

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
            <div :class="{ 'overview-section__block': true, 'overview-section__block--no-margin': user.premium }">
              <sign-up />
            </div>

            <div class="overview-section__block">
              <premium />
            </div>
          </div>
        </div>

        <div class="overview-section overview-section--with-ad d-lg-none">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <div class="intro">
                Stockchase compiles comments that experts make about stocks every day and helps you review how companies are thought of by investment experts. Sign up to get the latest news by email.
              </div>
            </div>
          </div>
        </div>

        <div class="overview-section overview-section--with-ad">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <in-the-news />
            </div>
          </div>

          <div
            v-if="shouldShowAd"
            class="overview-section__right d-none d-lg-block"
          >
            <div class="overview-section__block">
              <side-ad />
            </div>
          </div>
        </div>
      </div>

      <link-ad />
    </div>

    <div
      v-if="shouldShowAd"
      class="home-divider d-none d-lg-block"
    />

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
      <!-- <newest class="d-lg-none" /> -->
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
      // Top discover posts
      store.dispatch('FETCH_PREMIUM_COMPANIES'),
      // STOCK PICKS @MARKETCALL
      store.dispatch('FETCH_LATEST_EXPERTS', 3),
      // store.dispatch('FETCH_NEWEST_EXPERTS', 6),
      // store.dispatch('FETCH_NEWEST_COMPANIES', 6),
      // STOCKS IN THE NEWS
      store.dispatch('FETCH_BLOG_POSTS'),
      // TODAY'S MARKET OUTLOOK
      store.dispatch('FETCH_LATEST_COMMENT'),
      // TODAY'S MARKET OUTLOOK
      store.dispatch('FETCH_MARKET_CALL_GUESTS'),
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

  computed: {
    ...mapGetters([ 'shouldShowAd', 'user' ]),
  },

  watch: {
    shouldShowAd(should) {
      if (!should) return

      this.$nextTick(() => {
        googletag.cmd.push(() => { googletag.display('div-gpt-ad-9004875-8') })
      })
    }
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

      &--no-margin
        margin-bottom 0 !important

      &:not(:last-child):not(:only-child)
        margin-bottom 15px

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

.ad-container
  padding 20px 0
  background rgba(248, 248, 248, 0.7)
  border-bottom 1px solid #D9D9D9

  .ad
    width 728px
    max-width 100%
    min-height 90px
    margin 0 auto

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
