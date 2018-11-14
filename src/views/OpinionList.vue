<template>
  <div class="container">
    <opinions-header />

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

    <opinions-footer />
  </div>
</template>

<script>
import { watchList } from '../api'
import OpinionsHeader from '../components/opinions/Header.vue'
import OpinionsFooter from '../components/opinions/Footer.vue'
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
