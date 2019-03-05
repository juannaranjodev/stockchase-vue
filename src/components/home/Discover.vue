<template>
  <div class="discover">
    <div class="discover-list">
      <div
        class="discover-item"
      >
        <div class="discover-item__image">
          <img
            src="~assets/images/questrade-best-canadian-brokerage.png"
            width="88"
            height="55"
            alt="Image"
          >
        </div>
        <div class="discover-item__content">
          <a
            href="#"
            class="discover-item__link"
          >
            <span class="discover-item__title">Gibson Energy, Great Canadian Gaming Corp and More Earnings Reports this Week (Mar 04-08)</span>
            <span class="discover-item__excerpt">- Some excerpt here Some excerpt here</span>
          </a>
        </div>
      </div>
      <div
        class="discover-item"
      >
        <div class="discover-item__image">
          <img
            src="~assets/images/questrade-best-canadian-brokerage.png"
            width="88"
            height="55"
            alt="Image"
          >
        </div>
        <div class="discover-item__content">
          <a
            href="#"
            class="discover-item__link"
          >
            <span class="discover-item__title">Gibson Energy, Great Canadian Gaming Corp and More Earnings Reports this Week (Mar 04-08)</span>
            <span class="discover-item__excerpt">- Some excerpt here Some excerpt here</span>
          </a>
        </div>
      </div>
      <div
        class="discover-item"
      >
        <div class="discover-item__image">
          <img
            src="~assets/images/questrade-best-canadian-brokerage.png"
            width="88"
            height="55"
            alt="Image"
          >
        </div>
        <div class="discover-item__content">
          <a
            href="#"
            class="discover-item__link"
          >
            <span class="discover-item__title">Gibson Energy, Great Canadian Gaming Corp and More Earnings Reports this Week (Mar 04-08)</span>
            <span class="discover-item__excerpt">- Some excerpt here Some excerpt here</span>
          </a>
        </div>
      </div>
    </div>
    <div class="discover-footer">
      <a
        class="discover-more"
        href="/discover"
      >More discover posts ...</a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeDiscover',
  serverCacheKey: () => {
    return `home::discover`
  },
}
</script>

<style lang="stylus" scoped>
.discover
  &-list
    display block
  &-item
    display flex
    align-items center
    flex-wrap nowrap
    padding 15px 0
    border-bottom 1px solid #D9D9D9

    &__image
      width 88px
      height 55px
      flex-grow 0
      flex-shrink 0
      display flex
      margin-right 20px

    &__content
      flex 1

    &__link
      display block
      color #1B475E !important
      text-decoration none
      font-size 18.5px
      line-height 1.5
      overflow hidden
      text-overflow -o-ellipsis-lastline
      text-overflow ellipsis
      /* autoprefixer: off */
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      max-height 3em

    &__title
      font-weight bold

    &__excerpt
      font-weight normal

  &-footer
    padding 8px 0

  &-more
    color #bfbfbf
    text-decoration none
    font-size 18px

    &:hover
      color inherit
</style>
