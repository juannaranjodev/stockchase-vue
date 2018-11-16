<template>
  <div class="container">
    <opinions-header />
    <opinions-slider :items="recentItems" />

    <div class="opinions-container">
      <div class="pagination">
        <div class="pagination-left">
          {{ date | formatDate }}
        </div>
        <div class="pagination-right">
          <a class="btn-navigate" v-if="olderDate" :href="'/opinions/' + olderDate">
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

      <div class="pagination">
        <div class="pagination-left">
          <a class="btn-navigate" v-if="newerDate" :href="'/opinions/' + newerDate">
            <img src="~assets/images/arrow-left.png" width="20">
            <span>{{ newerDate | formatDate }}</span>
          </a>
        </div>
        <div class="pagination-right">
          <a class="btn-navigate" v-if="olderDate" :href="'/opinions/' + olderDate">
            <span>{{ olderDate | formatDate }}</span>
            <img src="~assets/images/arrow-right.png" width="20">
          </a>
        </div>
      </div>
    </div>

    <opinions-footer />
    <comments-modal ref="commentsModal" />
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import OpinionsHeader from '../components/opinions/Header.vue'
import OpinionsFooter from '../components/opinions/Footer.vue'
import OpinionsSlider from '../components/opinions/Slider.vue'
import Item from '../components/opinions/Item.vue'
import CommentsModal from '../components/opinions/CommentsModal.vue'

export default {
  name: 'opinion-list',

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_DAILY_OPINIONS', { date: route.params.date })
  },

  title: 'Recent Opinions',

  components: {
    OpinionsHeader,
    OpinionsFooter,
    OpinionsSlider,
    Item,
    CommentsModal,
  },

  computed: {
    olderDate () {
      return this.$store.getters.opinions.olderDate
    },
    newerDate () {
      return this.$store.getters.opinions.newerDate
    },
    date () {
      return this.$store.getters.opinions.date
    },
    items () {
      return this.$store.getters.opinions.items
    },
    recentItems () {
      return this.$store.getters.opinions.recentItems
    },
  },

  methods: {
    showComments(opinion) {
      this.$refs.commentsModal.setupComments(opinion)
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
  justify-content space-between
  margin 10px 0

.btn-navigate
  background-color red
  border-radius 5px
  padding 7px 10px
  color white
  display inline-flex
  align-items center
  text-decoration none

  img
    &:first-child
      margin-right 3px
    &:last-child
      margin-left 3px

.opinions-table
  font-size 16px
  line-height 160%
  border 1px solid #ccc
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

.news-view
  padding-top 0

.news-list
  background-color #fff
  border-radius 2px

.news-list
  margin 30px 0
  width 100%
  ul
    list-style-type none
    padding 0
    margin 0

@media (max-width 600px)
  .news-list
    margin 10px 0
</style>
