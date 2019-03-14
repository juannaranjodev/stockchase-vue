<template>
  <div class="opinions-container">
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
      <opinions-header :type="type" />
      <opinions-slider
        v-if="isOpinions"
        :items="items"
        :page="currentPage"
      />
      <link-ad />
      <opinions-summary
        v-if="!isOpinions"
        :items="items" />

      <div class="opinions-container">
        <opinions-pagination
          top
          :type="type"
        />
        <opinions-list />
        <link-ad class="d-none d-lg-block" />
        <opinions-pagination
          bottom
          :type="type"
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
import OpinionsHeader from '../components/opinions/Header.vue'
import OpinionsSlider from '../components/opinions/Slider.vue'
import OpinionsSummary from '../components/opinions/Summary.vue'
import LinkAd from '../components/ads/LinkAd.vue'
import DianomiAd from '../components/ads/DianomiAd.vue'
import OpinionsPagination from '../components/opinions/Pagination.vue'
import OpinionsList from '../components/opinions/List.vue'

export default {
  name: 'OpinionsListView',

  props: {
    type: {
      type: String,
      default: 'opinions'
    }
  },

  components: {
    OpinionsHeader,
    LinkAd,
    OpinionsSlider,
    OpinionsSummary,
    DianomiAd,
    OpinionsPagination,
    OpinionsList,
  },

  computed: {
    ...mapGetters([ 'opinions', 'shouldShowAd' ]),

    currentPage() {
      return +this.$route.params.page || 1
    },

    items() {
      return this.opinions
    },

    isOpinions() {
      return this.type === 'opinions'
    },
  },

  watch: {
    shouldShowAd(should) {
      if (!should) return

      this.$nextTick(() => {
        googletag.cmd.push(() => { googletag.display('div-gpt-ad-9004875-8') })
      })
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

</style>
