<template>
  <div class="discover">
    <div class="discover-list">
      <a
        href="#"
        class="discover__item"
      >
        <div class="discover__item-image">
          <img
            src="~assets/images/questrade-best-canadian-brokerage.png"
            width="88"
            height="55"
            alt="Image"
          >
        </div>
        <div class="discover__item-content">
          <span class="discover__item-title">Gibson Energy, Great Canadian Gaming Corp and More Earnings Reports this Week (Mar 04-08)</span>
          <span class="discover__item-excerpt"> - Some excerpt here Some excerpt here</span>
        </div>
      </a>
      <a
        href="#"
        class="discover__item"
      >
        <div class="discover__item-image">
          <img
            src="~assets/images/questrade-best-canadian-brokerage.png"
            width="88"
            height="55"
            alt="Image"
          >
        </div>
        <div class="discover__item-content">
          <span class="discover__item-title">Gibson Energy, Great Canadian Gaming Corp and More Earnings Reports this Week (Mar 04-08)</span>
          <span class="discover__item-excerpt"> - Some excerpt here Some excerpt here</span>
        </div>
      </a>
      <a
        href="#"
        class="discover__item"
      >
        <div class="discover__item-image">
          <img
            src="~assets/images/questrade-best-canadian-brokerage.png"
            width="88"
            height="55"
            alt="Image"
          >
        </div>
        <div class="discover__item-content">
          <span class="discover__item-title">Gibson Energy, Great Canadian Gaming Corp and More Earnings Reports this Week (Mar 04-08)</span>
          <span class="discover__item-excerpt"> - Some excerpt here Some excerpt here</span>
        </div>
      </a>
    </div>
    <div class="discover__footer">
      <a
        class="discover__more"
        href="/discover"
      >More discover posts...</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeDiscover',
  serverCacheKey: () => {
    return `home::discover`
  },
}
</script>

<style lang="stylus" scoped>
.discover
  &__list
    display block

  &__item
    display flex
    align-items center
    flex-wrap nowrap
    padding 15px 0
    border-bottom 1px solid #D9D9D9
    color #1B475E !important
    text-decoration none

    &-image
      width 88px
      height 55px
      flex-grow 0
      flex-shrink 0
      display flex
      margin-right 20px

    &-content
      flex 1
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

    &-title
      font-weight bold

    &-excerpt
      font-weight normal

  &__footer
    padding 8px 0

  &__more
    color #bfbfbf
    text-decoration none
    font-size 18px

    &:hover
      color inherit
</style>
