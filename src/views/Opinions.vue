<template>
  <div class="opinions-container">
    <leaderboard-ad ad-slot="3572899802" />

    <div class="container">
      <opinions-header :type="type" />
      <opinions-slider
        v-if="isOpinions"
        :items="items"
        :page="currentPage"
      />
      <link-ad />
      <opinions-summary
        v-if="!isOpinions"
        :items="items"
      />

      <div class="opinions-container">
        <date-pagination
          top
          :url-pattern="urlPattern"
          :num-date-items="items.length"
        />
        <opinions-list />
        <link-ad class="d-none d-lg-block" />
        <date-pagination
          bottom
          :url-pattern="urlPattern"
          :num-date-items="items.length"
        />
      </div>

      <dianomi-ad />
      <link-ad class="d-none d-lg-block" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import OpinionsHeader from '../components/Opinions/Header.vue'
import OpinionsSlider from '../components/Opinions/Slider.vue'
import OpinionsSummary from '../components/Opinions/Summary.vue'
import LinkAd from '../components/Ads/LinkAd.vue'
import DianomiAd from '../components/Ads/DianomiAd.vue'
import LeaderboardAd from '../components/Ads/LeaderboardAd.vue'
import DatePagination from '../components/DatePagination.vue'
import OpinionsList from '../components/Opinions/List.vue'

export default {
  name: 'Opinions',

  components: {
    OpinionsHeader,
    LinkAd,
    OpinionsSlider,
    OpinionsSummary,
    DianomiAd,
    LeaderboardAd,
    DatePagination,
    OpinionsList,
  },

  props: {
    type: {
      type: String,
      default: 'opinions'
    }
  },

  computed: {
    ...mapGetters([ 'opinions' ]),

    currentPage() {
      return +this.$route.params.page || 1
    },

    items() {
      return this.opinions
    },

    isOpinions() {
      return this.type === 'opinions'
    },

    urlPattern() {
      return this.isOpinions ? '/opinions/:date' : '/opinions/market/:date'
    }
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
  padding 0 20px 20px
  margin 0 auto

@media (max-width 991px)
  .container
    padding 0 10px

</style>
