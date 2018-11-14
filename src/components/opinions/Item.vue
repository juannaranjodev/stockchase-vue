<template>
  <tr class="opinions-item">
    <td>{{ item.Signal.name }}</td>
    <td>
      <h3>{{ item.Company.name }} ({{ item.Company.symbol }})</h3>
      <div>{{ item.date }}</div>
      <p v-html="item.comment"></p>
      <a @click="showComments">Comments</a>
    </td>
    <td>{{ item.Expert.name }}</td>
  </tr>
</template>

<script>
import { timeAgo } from '../../util/filters'

export default {
  name: 'opinions-item',
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
.opinions-item
  td
    border 1px solid #ccc
    padding 10px
    text-align left
    background #fcfcfc

</style>
