<template>
  <div class="container">
    <opinions-header :type="type" />
    <opinions-slider
      v-if="isOpinions"
      :items="items"
      :page="currentPage"
      :num-pages="numPages"
    />
    <opinions-link-ad />
    <opinions-summary
      v-if="!isOpinions"
      :items="items" />

    <div class="opinions-container">
      <div class="pgntn">
        <div class="pgntn-left">
          {{ date | formatDate }}
        </div>
        <div class="pgntn-right">
          <a
            class="btn-navigate"
            v-if="olderDate"
            :href="olderUrl">
            <span>{{ olderDate | formatDate }}</span>
            <img
              src="~assets/images/arrow-right.png"
              width="20">
          </a>
        </div>
      </div>

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
            @showComments="showComments"
          />
        </tbody>
      </table>

      <opinions-link-ad />

      <ul class="pagination justify-content-center">
        <li :class="{'page-item': true, 'disabled': !newerDate}">
          <a
            v-if="newerDate"
            :href="newerUrl"
            class="page-link">&laquo; {{ newerDate | formatDate }}</a>
          <span
            v-else
            class="page-link">&laquo;</span>
        </li>

        <li :class="{'page-item': true, 'disabled': !prevPage}">
          <a
            v-if="prevPage"
            :href="prevPageUrl"
            class="page-link">&lsaquo;</a>
          <span
            v-else
            class="page-link">&lsaquo;</span>
        </li>

        <li
          v-for="page in numPages"
          :key="`page_${page}`"
          :class="{'page-item': true, active: page === currentPage}"
        >
          <span
            v-if="page === currentPage"
            class="page-link">{{ page }}</span>
          <a
            v-else
            class="page-link"
            :href="getPageUrl(page)">{{ page }}</a>
        </li>

        <li :class="{'page-item': true, 'disabled': !nextPage}">
          <a
            v-if="nextPage"
            :href="nextPageUrl"
            class="page-link">&rsaquo;</a>
          <span
            v-else
            class="page-link">&rsaquo;</span>
        </li>

        <li :class="{'page-item': true, 'disabled': !olderDate}">
          <a
            v-if="olderDate"
            :href="olderUrl"
            class="page-link">{{ olderDate | formatDate }} &raquo;</a>
          <span
            v-else
            class="page-link">&raquo;</span>
        </li>
      </ul>
    </div>

    <opinions-dianomi-ad />
    <opinions-footer />
    <opinions-link-ad />

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
    Item,
    CommentsModal,
  },

  computed: {
    ...mapGetters([ 'date', 'olderDate', 'newerDate', 'opinions', 'shouldShowAd' ]),

    pageItems() {
      const startIndex = (this.currentPage - 1) * c.PER_PAGE
      const pageItems = this.items.slice(startIndex, startIndex + c.PER_PAGE)
      if (this.shouldShowAd) pageItems.splice(1, 0, { ad: true })
      return pageItems
    },

    items() {
      return this.opinions
    },

    isOpinions() {
      return this.type === 'opinions'
    },

    newerUrl() {
      return this.type === 'opinions' ? `/opinions/${this.newerDate}` : `/opinions/market/${this.newerDate}`
    },

    olderUrl() {
      return this.type === 'opinions' ? `/opinions/${this.olderDate}` : `/opinions/market/${this.olderDate}`
    },

    numPages() {
      return Math.ceil(this.opinions.length / c.PER_PAGE)
    },

    currentPage() {
      return +this.$route.params.page
    },

    prevPage() {
      if (this.currentPage > 1) return this.currentPage - 1
    },

    prevPageUrl() {
      return this.getPageUrl(this.prevPage)
    },

    nextPage() {
      if (this.currentPage < this.numPages) return this.currentPage + 1
    },

    nextPageUrl() {
      return this.getPageUrl(this.nextPage)
    },
  },

  methods: {
    showComments(id) {
      this.$refs.commentsModal.setupComments(id)
      this.$root.$emit('bv::show::modal', 'modal_comments')
    },

    getPageUrl(page) {
      const date = this.$route.params.date
      return this.type === 'opinions' ? `/opinions/${date}/${page}` : `/opinions/market/${date}/${page}`
    },
  },
}
</script>

<style lang="stylus" scoped>

.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

.pgntn
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between

  &-left, &-right
    margin 10px 0

  &-left
    margin-right 10px

.pagination
  margin 10px 0

  .page-link
    color #ec4d4b !important
    font-size 16px

  .page-item
    min-width 38px
    text-align center

    &.active
      .page-link
        background-color #ec4d4b
        border-color #ec4d4b
        color white !important
    &.disabled
      .page-link
        opacity 0.3
        color #6c757d !important

.btn-navigate
  background-color #ec4d4b
  border-radius 5px
  padding 7px 10px
  color white
  display inline-flex
  align-items center
  text-decoration none
  white-space nowrap

  img
    &:first-child
      margin-right 3px
    &:last-child
      margin-left 3px

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
