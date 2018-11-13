<template>
  <div class="news-view">
    <h1>{{$route.params.date}}</h1>
    <div class="news-list-nav">
      <a v-if="newerDate" :href="'/opinions/' + newerDate">&lt; {{ newerDate }}</a>
      <a v-else class="disabled">&lt; No Newer</a>
      <span>{{ date }}</span>
      <a v-if="olderDate" :href="'/opinions/' + olderDate">{{ olderDate }} &gt;</a>
      <a v-else class="disabled">No Older &gt;</a>
    </div>
    <transition :name="transition">
      <div class="news-list" :key="date">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { watchList } from '../api'
import Item from '../components/OpinionItem.vue'

export default {
  name: 'opinion-list',

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_DAILY_OPINIONS', { date: route.params.date })
  },

  title: 'Recent Opinions',

  components: {
    Item
  },

  data () {
    return {
      type: 'top',
      transition: 'slide-right',
      // displayedPage: Number(this.$route.params.page) || 1,
      // displayedItems: this.$store.getters.opinions.opinions,
    }
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

  beforeMount () {
    // if (this.$root._isMounted) {
    //   this.loadItems(this.page)
    // }
    // // watch the current list for realtime updates
    // this.unwatchList = watchList(this.type, ids => {
    //   this.$store.commit('SET_LIST', { type: this.type, ids })
    //   this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
    //     this.displayedItems = this.$store.getters.activeItems
    //   })
    // })
  },

  beforeDestroy () {
    // this.unwatchList()
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems (to = this.page, from = -1) {
      this.$bar.start()
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.type}/1`)
          return
        }
        this.transition = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }
}
</script>

<style lang="stylus">
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
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-list
    margin 10px 0
</style>
