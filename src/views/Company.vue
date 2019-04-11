<template>
  <div class="company-container">
    <div class="container">
      <div class="overview">
        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <company-overview />
            </div>
          </div>

          <div class="overview-section__right">
            <div class="overview-section__block">
              <join-discussion />
            </div>
          </div>
        </div>

        <div class="overview-section overview-section--with-ad">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <div>
                <h1>Company chart</h1>
              </div>
            </div>
          </div>

          <div
            v-if="shouldShowAd"
            class="overview-section__right d-none d-lg-block"
          >
            <div class="overview-section__block">
              <side-adx slot-id="div-gpt-ad-9004875-1" />
            </div>
          </div>
        </div>

        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <div>
                <h1>About {{ company.name }} ({{ company.symbol }})</h1>
              </div>
            </div>
          </div>

          <div class="overview-section__right">
            <div class="overview-section__block">
              <div>
                <h1>Press links</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <company-header />
      <link-ad />

      <div class="opinions-container">
        <opinions-list :items="opinions" />
        <div class="opinions-count">
          Showing {{ startPosition }} to {{ endPosition }} of {{ numTotalOpinions }} entries
        </div>
        <link-ad class="d-none d-lg-block" />
        <number-pagination
          :num-total-pages="numOpinionPages"
          :current-page="currentPage"
          :url-pattern="urlPattern"
        />
      </div>

      <dianomi-ad />
      <link-ad class="d-none d-lg-block" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stripTags } from '../util/filters'

import CompanyHeader from '../components/Company/Header.vue'
import CompanyOverview from '../components/Company/Overview.vue'
import JoinDiscussion from '../components/Company/JoinDiscussion.vue'
import LinkAd from '../components/Ads/LinkAd.vue'
import DianomiAd from '../components/Ads/DianomiAd.vue'
import SideAdx from '../components/Ads/SideAdx.vue'
import OpinionsList from '../components/Opinions/List.vue'
import NumberPagination from '../components/NumberPagination.vue'

export default {
  name: 'Company',

  components: {
    CompanyHeader,
    CompanyOverview,
    JoinDiscussion,
    LinkAd,
    DianomiAd,
    SideAdx,
    OpinionsList,
    NumberPagination
  },

  computed: {
    ...mapGetters([ 'company', 'opinions', 'numTotalOpinions', 'shouldShowAd' ]),

    title() {
      return `${this.company.name} (${this.company.symbol})`
    },

    currentPage () {
      return +this.$route.params.page || 1
    },

    perPage () {
      return +this.$route.params.perPage || 15
    },

    numOpinionPages () {
      return Math.ceil(this.numTotalOpinions / this.perPage)
    },

    startPosition () {
      return (this.currentPage - 1) * this.perPage + 1
    },

    endPosition () {
      return this.startPosition + this.opinions.length - 1
    },

    urlPattern () {
      return `/company/view/${this.company.id}/sort/date/page/:page/direction/desc/max/${this.perPage}`
    },
  },

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_COMPANY', {
      id: route.params.id,
      symbol: route.params.symbol,
      page: +route.params.page,
      perPage: +route.params.perPage,
    })
  },

  title () {
    return `${this.title} Stock Predictions`
  },

  previewTitle () {
    return this.title
  },

  image () {
    return this.company.logo
  },

  description () {
    const latestOpinion = this.opinions[0]

    if (latestOpinion) return stripTags(latestOpinion.comment)
  },

  updated() {
    DISQUSWIDGETS.getCount({reset: true})
  }
}
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

.opinions-count
  color black
  margin 5px 0

.overview
  &-section
    margin-bottom 30px
    margin-top 30px
    display flex
    align-items flex-start
    flex-wrap nowrap
    justify-content space-between

    &__left, &__right
      width calc(50% - 15px/2)
      flex-grow 0
      flex-shrink 0

    &__left
      flex 1
      width auto

    &__right
      width 300px
      margin-left 40px
      flex-shrink 0

    &__block
      width 100%

@media (max-width 991px)
  .container
    padding 0 10px

  .overview
    &-section
      display flex
      flex-direction column-reverse
      align-items center

      &__left, &__right
        width 100%
        margin 0

</style>
