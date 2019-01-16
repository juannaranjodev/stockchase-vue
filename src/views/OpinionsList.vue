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
        top
        :type="type"
      />

      <div
        class="opinions-table"
        :key="date">
        <div class="opinions-table__thead">
          <div class="opinions-table__tr">
            <div class="opinions-table__th opinions-table__th--signal"><span>Signal</span></div>
            <div class="opinions-table__th opinions-table__th--opinion"><span>Opinion</span></div>
            <div class="opinions-table__th opinions-table__th--expert"><span>Expert</span></div>
          </div>
        </div>
        <div class="opinions-table__tbody">
          <item
            v-for="item in pageItems"
            :key="item.id"
            :item="item"
            :page="currentPage"
            @showComments="showComments"
          />
        </div>
      </div>

      <opinions-link-ad class="d-none d-md-block" />

      <opinions-pagination
        bottom
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
    OpinionsDianomiAd,
    OpinionsPagination,
    Item,
    CommentsModal,
  },

  computed: {
    ...mapGetters([ 'date',  'opinions', 'shouldShowAd', 'adFree' ]),

    pageItems() {
      if (this.adFree) return this.items

      const startIndex = (this.currentPage - 1) * c.PER_PAGE
      const pageItems = this.items.slice(startIndex, startIndex + c.PER_PAGE)
      if (this.shouldShowAd) pageItems.splice(1, 0, { ad: true })
      return pageItems
    },

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

  methods: {
    showComments(id) {
      this.$refs.commentsModal.setupComments(id)
      this.$root.$emit('bv::show::modal', 'modal_comments')
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

  &__tr
    display flex
    flex-wrap nowrap

  &__th
    border 1px solid #ccc
    padding 10px
    text-align left
    border-top-width 0
    border-left-width 0

    &:first-child
      border-left-width 1px

  &__th
    background #F7F7F7
    font-weight normal

    &--signal
      width 80px
      flex-grow 0
      flex-shrink 0

    &--opinion
      width 1px
      flex-grow 1

    &--expert
      width 170px
      flex-grow 0
      flex-shrink 0

    span
      color #FF4135

@media (max-width 767px)
  .container
    padding 0 10px

  .opinions-table
    width auto

    &__thead
      display none

    &__tbody
      display block

</style>
