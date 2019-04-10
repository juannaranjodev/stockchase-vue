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
            <div :class="{ 'overview-section__block': true, 'overview-section__block--no-margin': user.premium }">
              <sign-up />
            </div>

            <div class="overview-section__block">
              <premium />
            </div>
          </div>
        </div>

        <div class="overview-section d-lg-none">
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

          <div :class="{ 'overview-section__right d-none d-lg-block': true, 'overview-section__right--empty': !shouldShowAd }">
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
        <opinions-list :items="displayedOpinions" />

        <div class="opinions__actions">
          <a href="/opinions/recent">
            <img src="~assets/images/more.png">
            <span>Read More</span>
          </a>
        </div>
      </div>

      <!-- <sponsors class="d-lg-none" /> -->
      <!-- <newest class="d-lg-none" /> -->
      <!-- <follow-us class="d-lg-none" /> -->

      <dianomi-ad />
      <link-ad class="d-none d-lg-block" />
    </div>
    <b-modal
      id="modal_stock_saved"
      centered
      hide-footer
      modal-class="stock-saved-modal"
    >
      <div class="stock-saved">
        Stock saved to your watch list successfully.
        <a href="/portfolio">View Watch List</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Discover from '../components/Home/Discover.vue'
import MarketCall from '../components/Home/MarketCall.vue'
import MarketCallGuests from '../components/Home/MarketCallGuests.vue'
import MarketOutlook from '../components/Home/MarketOutlook.vue'
import SignUp from '../components/Home/SignUp.vue'
import Premium from '../components/Home/Premium.vue'
import InTheNews from '../components/Home/InTheNews.vue'
// import Sponsors from '../components/Home/Sponsors.vue'
// import Newest from '../components/Home/Newest.vue'
// import FollowUs from '../components/Home/FollowUs.vue'
import LinkAd from '../components/Ads/LinkAd.vue'
import SideAd from '../components/Ads/SideAd.vue'
import DianomiAd from '../components/Ads/DianomiAd.vue'
import OpinionsList from '../components/Opinions/List.vue'

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
    // Sponsors,
    // Newest,
    // FollowUs,
  },

  computed: {
    ...mapGetters([ 'shouldShowAd', 'user', 'opinions' ]),

    displayedOpinions () {
      return _.take(this.opinions, 10)
    }
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
      store.dispatch('FETCH_BLOG_POSTS', 5),
      // TODAY'S MARKET OUTLOOK
      store.dispatch('FETCH_LATEST_COMMENT'),
      // TODAY'S MARKET OUTLOOK
      store.dispatch('FETCH_MARKET_CALL_GUESTS', 3),
      // Mobile opinions listing
      store.dispatch('FETCH_DAILY_OPINIONS', {
        type: 'opinions',
        date: 'recent',
      }),
      store.dispatch('FETCH_DISQUS_COMMENTS_COUNT'),
    ]

    return Promise.all(queries)
  },
}
</script>

<style lang="stylus">
.home-divider
  border-top 1px dashed #E9E9EA
  margin 25px 0

.stock-saved
  text-align center
  color #ABB2B9
  font-size 18px
  padding 0 20px 20px
  line-height normal

  a
    color #FF2E50
    white-space nowrap

  &-modal
    .modal-header
      border-bottom 0
      padding-bottom 0

    .modal-body
      padding-top 0
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

      &--empty
        display none !important

      &:only-child
        flex 1
        width auto

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
