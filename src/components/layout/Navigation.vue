<template>
  <div class="navigation">
    <nav class="inner">
      <div class="inner-left">
        <div class="link">
          <a :href="appUrl">
            <img class="home" src="~assets/images/stockchase-home-icon.png" alt="logo">
          </a>
        </div>
        <div class="link active">
          <a :href="appUrl + '/opinions/recent'">All Opinions</a>
        </div>
        <div class="link">
          <a :href="appUrl + '/market/'">Answers</a>
        </div>
        <div class="link">
          <a :href="appUrl + '/opinions/recenttop'">Top Picks</a>
        </div>
        <div class="link">
          <a :href="appUrl + '/discover/'">Discover</a>
        </div>
        <div class="link">
          <a :href="appUrl + '/company'">Companies</a>
        </div>
        <div class="link">
          <a :href="appUrl + '/expert'">Experts</a>
        </div>
      </div>
      <div class="inner-right">
        <a class="watchlist" href="/portfolio">
          <img src="~assets/svgs/watch_list_icon.svg">
          watch list
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import * as c from '../../constants'

export default {
  name: 'site-navigation',

  data () {
    return {
      appUrl: c.APP_URL,
    }
  },
}
</script>

<style lang="stylus" scoped>
.navigation
  background-color #fff
  border-bottom 1px solid #D9D9D9
  display flex
  align-items center

  .home
    width 20px
    margin-top -8px

  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto
    display flex
    align-items center
    justify-content space-between
    flex-wrap wrap

    &-left, &-right
      margin 20px 0

  .link
    font-size 14pt
    line-height 1.6
    font-weight 500
    display inline-block
    margin-right 25px

    &:first-child
      margin-left 2px

    &.active
      color #EC4D4B
      border-bottom: 2px solid #EC4D4B

    a
      font-size 16px
      color inherit
      &:hover
        text-decoration none

  .watchlist
    margin-top 9px
    color black
    text-transform uppercase
    white-space nowrap

@media (max-width 767px)
  .navigation .inner
    padding 0 15px
</style>
