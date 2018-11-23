<template>
  <div class="container">
    <opinions-header :type="type" />
    <opinions-slider v-if="isOpinions" :items="recentOpinions" />
    <opinions-link-ad />
    <opinions-summary v-if="!isOpinions" :items="recentOpinions" />

    <div class="opinions-container">
      <div class="pagination">
        <div class="pagination-left">
          {{ date | formatDate }}
        </div>
        <div class="pagination-right">
          <a class="btn-navigate" v-if="olderDate" :href="olderUrl">
            <span>{{ olderDate | formatDate }}</span>
            <img src="~assets/images/arrow-right.png" width="20">
          </a>
        </div>
      </div>

      <table class="opinions-table" :key="date">
        <thead>
          <tr>
            <th><span>Signal</span></th>
            <th><span>Opinion</span></th>
            <th><span>Expert</span></th>
          </tr>
        </thead>
        <tbody>
          <item
            v-for="item in items"
            :key="item.id"
            :item="item"
            @showComments="showComments"
          />
        </tbody>
      </table>

      <opinions-link-ad />

      <div class="pagination">
        <div class="pagination-left">
          <a class="btn-navigate" v-if="newerDate" :href="newerUrl">
            <img src="~assets/images/arrow-left.png" width="20">
            <span>{{ newerDate | formatDate }}</span>
          </a>
        </div>
        <div class="pagination-right">
          <a class="btn-navigate" v-if="olderDate" :href="olderUrl">
            <span>{{ olderDate | formatDate }}</span>
            <img src="~assets/images/arrow-right.png" width="20">
          </a>
        </div>
      </div>
    </div>

    <opinions-dianomi-ad />
    <opinions-footer />
    <opinions-link-ad />

    <comments-modal ref="commentsModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  name: 'item-list',

  props: {
    type: String
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
    ...mapGetters([ 'date', 'olderDate', 'newerDate', 'opinions', 'recentOpinions', 'shouldShowAd' ]),

    items() {
      const items = _.clone(this.opinions)
      if (this.shouldShowAd) items.splice(1, 0, { ad: true })
      return items
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
  padding 0 20px
  margin 0 auto

.pagination
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between

  &-left, &-right
    margin 10px 0

  &-left
    margin-right 10px

.btn-navigate
  background-color red
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
    padding 0 15px

  .opinions-table
    display block
    width auto

    thead
      display none

    tbody
      display block

</style>
