<template>
  <div class="company-overview">
    <div class="company-logo">
      <img :src="company.logo">
    </div>
    <div class="company-meta">
      <div
        class="company-name-symbol"
      >
        <div class="company-name">
          {{ company.name }}
        </div>
        <div class="company-symbol">
          ({{ company.symbol }})
        </div>
      </div>
      <div class="company-watching">
        64 watching
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Overview',

  computed: {
    ...mapGetters(['company']),
  },
}
</script>

<style lang="stylus" scoped>
.company
  &-overview
    display flex
    align-items center

  &-logo
    width 120px
    height 120px
    border-radius 5px
    margin 0 10px 0 0
    border 1px solid #ccc
    background white
    position relative
    display block

    img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      max-width 85%
      max-height 85%
      width auto
      height auto

  &-meta
    flex 1

  &-name-symbol
    display flex
    align-items center
    font-size 21px
    font-weight bold
    text-decoration none
    color #000

  &-name
    color inherit

  &-symbol
    color #ABB3B9
    margin-left 3px
    white-space nowrap

</style>
