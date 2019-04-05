<template>
  <div class="company-container">
    <div class="container">
      <company-header />
      <link-ad />

      <div class="opinions-container">
        <opinions-list :items="opinions" />
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
import LinkAd from '../components/Ads/LinkAd.vue'
import DianomiAd from '../components/Ads/DianomiAd.vue'
import OpinionsList from '../components/Opinions/List.vue'
import NumberPagination from '../components/NumberPagination.vue'

export default {
  name: 'Company',

  components: {
    CompanyHeader,
    LinkAd,
    DianomiAd,
    OpinionsList,
    NumberPagination
  },

  computed: {
    ...mapGetters([ 'company', 'opinions', 'numOpinionPages' ]),

    title() {
      return `${this.company.name} (${this.company.symbol})`
    },

    currentPage () {
      return +this.$route.params.page || 1
    },

    perPage () {
      return +this.$route.params.perPage || 15
    },

    urlPattern () {
      return `/company/view/${this.company.id}/sort/date/page/:page/direction/desc/max/${this.perPage}`
    }
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

@media (max-width 991px)
  .container
    padding 0 10px

</style>
