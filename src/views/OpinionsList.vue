<template>
  <div class="opinions-container">
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
