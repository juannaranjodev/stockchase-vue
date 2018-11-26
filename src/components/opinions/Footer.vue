<template>
  <div class="footer">
    <div class="footer-stock-list">
      <span class="footer-stock-list-label">Top Picks</span>
      <span
        v-for="item in topPicks"
        :key="`topPicks::${item.id}`"
        class="footer-stock-list-item"
        >
          <a :href="`/company/view/${item.company_id}`">{{ item.company_symbol }}</a>
      </span>
      <a class="view-all" :href="recentTopLink">View all...</a>
    </div>
    <div class="footer-stock-list">
      <span class="footer-stock-list-label">Top Picks</span>
      <span
        v-for="item in trendingStocks"
        :key="`trendingStocks::${item.id}`"
        class="footer-stock-list-item"
        >
          <a :href="`/company/view/${item.id}`">{{ item.symbol }}</a>
      </span>
    </div>
  </div>
</template>

<script>
import * as c from '../../constants'
import _ from 'lodash'

export default {
  name: 'opinions-footer',
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: () => {
    return `opinions::footer`
  },
  data () {
    return {
      recentTopLink: `${c.APP_URL}/opinions/recenttop`
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_TOP_PICKS')
    this.$store.dispatch('FETCH_TRENDING_STOCKS')
  },

  computed: {
    topPicks() {
      return _.take(this.$store.getters.topPicks, 6)
    },
    trendingStocks() {
      return _.take(this.$store.getters.trendingStocks, 10)
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer
  margin 50px 0

  &-stock-list
    padding 0
    margin-top 10px

    &-label
      background #A3A2A2
      padding 5px 0
      text-align center
      text-transform uppercase
      margin-right 10px
      margin-top 5px
      display inline-block
      border-radius 3px
      color white
      min-width 92px

    &-item
      background #D8D8D8
      padding 5px
      margin-right 10px
      margin-top 5px
      display inline-block
      border-radius 3px

      a
        font-size 15px
        color #25325A
.view-all
  color #ec4d4b
  white-space nowrap
  padding 10px 0
  display inline-block
</style>
