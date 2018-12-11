<template>
  <div class="container">
    <opinions-header :type="type" />
    <opinions-slider
      v-if="isOpinions"
      :items="items"
      :page="currentPage"
    />
    <opinions-link-ad />
    <opinions-summary
      v-if="!isOpinions"
      :items="items" />

    <div class="opinions-container">
      <opinions-pagination
        left
        :type="type"
      />

      <table
        class="opinions-table"
        :key="date">
        <thead>
          <tr>
            <th><span>Signal</span></th>
            <th><span>Opinion</span></th>
            <th><span>Expert</span></th>
          </tr>
        </thead>
        <tbody>
          <item
            v-for="item in pageItems"
            :key="item.id"
            :item="item"
            :page="currentPage"
            @showComments="showComments"
          />
        </tbody>
      </table>

      <opinions-link-ad class="d-none d-md-block" />

      <opinions-pagination
        left
        right
        :type="type"
      />
    </div>

    <opinions-dianomi-ad />
    <opinions-link-ad class="d-none d-md-block" />

    <comments-modal ref="commentsModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as c from '../constants'
import moment from 'moment'
import _ from 'lodash'
import OpinionsHeader from '../components/opinions/Header.vue'
import OpinionsFooter from '../components/opinions/Footer.vue'
import OpinionsSlider from '../components/opinions/Slider.vue'
import OpinionsSummary from '../components/opinions/Summary.vue'
import OpinionsLinkAd from '../components/opinions/LinkAd.vue'
import OpinionsDianomiAd from '../components/opinions/DianomiAd.vue'
import OpinionsPagination from '../components/opinions/Pagination.vue'
import Item from '../components/opinions/Item.vue'
import CommentsModal from '../components/opinions/CommentsModal.vue'

export default {
  name: 'ItemList',

  props: {
    type: {
      type: String,
      default: 'opinions'
    }
  },

  components: {
    OpinionsHeader,
    OpinionsLinkAd,
    OpinionsSlider,
    OpinionsSummary,
    OpinionsFooter,
    OpinionsDianomiAd,
    OpinionsPagination,
    Item,
    CommentsModal,
  },

  computed: {
    ...mapGetters([ 'date',  'opinions', 'shouldShowAd', 'adFree' ]),

    pageItems() {
      // Show all items in the page for ad-free users
      if (this.adFree) return this.items

      const startIndex = (this.currentPage - 1) * c.PER_PAGE
      const pageItems = this.items.slice(startIndex, startIndex + c.PER_PAGE)
      if (this.shouldShowAd) pageItems.splice(1, 0, { ad: true })
      return pageItems
    },

    currentPage() {
      return +this.$route.params.page
    },

    items() {
      return this.opinions
    },

    isOpinions() {
      return this.type === 'opinions'
    },
  },

  methods: {
    showComments(id) {
      this.$refs.commentsModal.setupComments(id)
      this.$root.$emit('bv::show::modal', 'modal_comments')
    },
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

.opinions-table
  font-size 16px
  line-height 160%
  border-top 3px solid #474747
  border-radius 0
  border-collapse collapse
  border-spacing 0
  color #444
  background #fff
  width 100%

  th
    border 1px solid #ccc
    padding 10px
    text-align left

  th
    background #F7F7F7
    font-weight normal

    span
      color #FF4135

@media (max-width 767px)
  .container
    padding 0 10px

  .opinions-table
    display block
    width auto

    thead
      display none

    tbody
      display block

</style>
