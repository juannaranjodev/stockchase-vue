<template>
  <div class="footer">
    <div
      v-for="list in lists"
      :key="list.label"
      class="footer-stock-list"
    >
      <span class="footer-stock-list-label">{{ list.label }}</span>
      <span
        v-for="item in list.items"
        :key="item"
        class="footer-stock-list-item"
        >
          <a href="/company/view/undefined">{{ item }}</a>
      </span>
      <a v-if="list.link" :href="list.link" style="color: red;">View all...</a>
    </div>
  </div>
</template>

<script>
import * as c from '../../constants'

export default {
  name: 'opinions-footer',
  data () {
    return {
      lists: [
        {
          label: "Top Picks",
          items: ['ALA-T', 'ALA-A', 'ALA-B', 'ALA-C', 'ALA-D', 'ALA-E', 'ALA-F'],
          link: `${c.APP_URL}/opinions/recenttop`
        },
        {
          label: "Trending",
          items: ['ALA-T', 'ALA-A', 'ALA-B', 'ALA-C', 'ALA-D', 'ALA-E', 'ALA-F', 'ALA-G', 'ALA-H'],
        },
        {
          label: "Today",
          items: ['ALA-T', 'ALA-A', 'ALA-B', 'ALA-C', 'ALA-D', 'ALA-E', 'ALA-F', 'ALA-G', 'ALA-H'],
        }
      ]
    }
  },
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: () => {
    return `opinions::footer`
  },
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

</style>
