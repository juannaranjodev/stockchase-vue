<template>
  <div class="navigation">
    <nav class="inner d-none d-md-flex">
      <div class="inner-left">
        <div class="link-container">
          <a :href="appUrl">
            <img
              class="home"
              src="~assets/images/stockchase-home-icon.png"
              alt="logo">
          </a>
        </div>
        <div class="link-container active">
          <a :href="appUrl + '/opinions/recent'">All Opinions</a>
        </div>
        <div class="link-container">
          <a :href="appUrl + '/market/'">Answers</a>
        </div>
        <div class="link-container">
          <a :href="appUrl + '/opinions/recenttop'">Top Picks</a>
        </div>
        <div class="link-container">
          <a :href="appUrl + '/discover/'">Discover</a>
        </div>
        <div class="link-container">
          <a :href="appUrl + '/company'">Companies</a>
        </div>
        <div class="link-container">
          <a :href="appUrl + '/expert'">Experts</a>
        </div>
      </div>
      <div class="inner-right">
        <a
          class="watchlist"
          href="/portfolio">
          <img src="~assets/svgs/icon_watchlist_gray.svg">
          Watch List
        </a>
      </div>
    </nav>
    <nav class="inner inner--sm d-md-none">
      <a
        class="link active"
        :href="appUrl + '/opinions/recent'">
        <span class="link__icon"><img src="~assets/svgs/icon_opinions.svg"></span>
        <span class="link__label">Opinions</span>
      </a>
      <a
        class="link"
        :href="appUrl + '/company'">
        <span class="link__icon"><img src="~assets/svgs/icon_company.svg"></span>
        <span class="link__label">Company</span>
      </a>
      <a
        class="link"
        :href="appUrl + '/expert'">
        <span class="link__icon"><img src="~assets/svgs/icon_expert.svg"></span>
        <span class="link__label">Expert</span>
      </a>
      <a
        class="link"
        :href="appUrl + '/portfolio'">
        <span class="link__icon"><img src="~assets/svgs/icon_watchlist.svg"></span>
        <span class="link__label">Watch List</span>
      </a>
      <a
        class="link"
        :href="appUrl + '/opinions/recenttop'">
        <span class="link__icon"><img src="~assets/svgs/icon_toppicks.svg"></span>
        <span class="link__label">Top Picks</span>
      </a>
    </nav>
  </div>
</template>

<script>
import * as c from '../../constants'

export default {
  name: 'SiteNavigation',

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

    &--sm
      flex-wrap no-wrap
      justify-content space-around
      padding 3px
      background-color #383838
      border-radius 4px

    &-left, &-right
      margin 20px 0
      display flex
      align-items center
      flex-wrap wrap

  .link-container
    font-size 14pt
    line-height 1.6
    font-weight 500
    display block
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

  .link
    opacity 0.6
    display flex
    flex-direction column
    align-items center
    justify-content flex-end
    padding 3px 7px
    text-decoration none !important
    height 43px
    border-radius 3px

    &.active
      opacity 1
      background-color rgba(#6F7980, 0.45)

    &:focus, &:active
      background-color rgba(#6F7980, 0.45)

    &__label
      font-size 10px
      line-height 1.2
      color white !important
      flex-grow 0
      flex-shrink 0

    &__icon
      flex 1
      display flex
      align-items center
      justify-content center

  .watchlist
    color black
    text-transform uppercase
    white-space nowrap
    display block

@media (max-width 767px)
  .navigation
    border 0
    padding 0 10px 20px

</style>
