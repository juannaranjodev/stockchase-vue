<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <h2 class="title">Latest Expert Opinions</h2>
        <span class="link active">Stocks</span>
        <a class="link" href="/opinions/market">Stocks</a>
      </div>
      <div class="header-right">
        <a href="https://stockchase.recurly.com/subscribe/adfree" class="subscribe">Too many ads? Remove ads !</a>
      </div>
    </div>
    <h1>{{$route.params.date}}</h1>

    <div class="news-list-nav">
      <a v-if="newerDate" :href="'/opinions/' + newerDate">&lt; {{ newerDate }}</a>
      <a v-else class="disabled">&lt; No Newer</a>
      <span>{{ date }}</span>
      <a v-if="olderDate" :href="'/opinions/' + olderDate">{{ olderDate }} &gt;</a>
      <a v-else class="disabled">No Older &gt;</a>
    </div>

    <div class="news-list" :key="date">
      <ul>
        <item
          v-for="item in displayedItems"
          :key="item.id"
          :item="item"
          @showComments="showComments"
        ></item>
      </ul>
    </div>
    <comments-modal ref="commentsModal" />
  </div>
</template>

<script>
import { watchList } from '../api'
import Item from '../components/OpinionItem.vue'
import CommentsModal from '../components/CommentsModal.vue'

export default {
  name: 'opinion-list',

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_DAILY_OPINIONS', { date: route.params.date })
  },

  title: 'Recent Opinions',

  components: {
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
    displayedItems () {
      return this.$store.getters.opinions.items
    }
  },

  methods: {
    showComments(opinion) {
      this.$refs.commentsModal.setupComments(opinion)
      this.$root.$emit('bv::show::modal', 'modal_comments')
    },
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

.header
  height 58px
  display flex
  align-items center
  justify-content space-between
  border-bottom 2px solid #E9E9EA

  .title
    font-size 1.6em
    color #111
    line-height 1.1
    margin-bottom 0

  .link
    padding 5px 20px
    font-size 16px
    border-radius 15px
    margin-left 10px
    color black
    line-height 1.1

    &.active
      background #A3A2A2
      color white

  .title + .link
    margin-left 30px

  &-left, &-right
    display flex
    align-items center

  .subscribe
    color black
    text-decoration underline
    font-size 15px
    margin-top 5px

.news-view
  padding-top 0

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  padding 15px 30px
  text-align center
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

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
