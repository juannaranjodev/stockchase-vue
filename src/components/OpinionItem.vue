<template>
  <li class="news-item">
    <h3>{{ item.company.name }} ({{ item.company.symbol }})</h3>
    <div>{{ item.date }}</div>
    <p v-html="item.content"></p>
    <a @click="showComments">Comments</a>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id }}) => {
    return `opinion::${id}`
  },

  methods: {
    showComments() {
      this.$emit('showComments', this.item)
    }
  }
}
</script>

<style lang="stylus">
.news-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .score
    color #ff6600
    font-size 1.1em
    font-weight 700
    position absolute
    top 50%
    left 0
    width 80px
    text-align center
    margin-top -10px
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600
</style>
