<template>
  <div class="company-overview">
    <div class="company-logo">
      <img :src="company.logo">
    </div>
    <div class="company-meta">
      <h1
        class="company-name-symbol"
      >
        <div class="company-name">
          {{ company.name }}
        </div>
        <div class="company-symbol">
          {{ company.symbol }}
          <img
            src="~assets/svgs/top-pick-star.svg"
            width="20"
          >
        </div>
      </h1>
      <div class="company-watching">
        <img
          src="~assets/svgs/new-watchlist-icon.svg"
          width="30"
        >
        <span>{{ company.user_stocks_count }} watching</span>
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
    margin 0 20px 0 0
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
    align-items flex-start
    margin 0
    line-height 1

  &-name
    font-size 23px
    color #111
    font-weight normal
    overflow hidden
    text-overflow -o-ellipsis-lastline
    text-overflow ellipsis
    /* autoprefixer: off */
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    max-height 3em

  &-symbol
    color #25325A
    margin-left 20px
    white-space nowrap
    background-color #D8D8D8
    font-size 15px
    font-weight bold
    padding 5px 10px
    border-radius 3px
    position relative

    img
      position absolute
      top -7px
      right -10px

  &-watching
    display flex
    align-items center
    font-size 16px
    color #666666
    margin-top 20px

    img
      margin-right 3px

</style>
