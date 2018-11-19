<template>
  <div class="header">
    <div class="header-left">
      <h2 class="title">Latest Expert Opinions</h2>
      <a :class="{ link: true, active: type === 'opinions' }" href="/opinions/recent">Stocks</a>
      <a :class="{ link: true, active: type === 'comments' }" href="/opinions/market">Market</a>
    </div>
    <div class="header-right">
      <a href="https://stockchase.recurly.com/subscribe/adfree" class="subscribe">Too many ads? Remove ads !</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'opinions-header',
  props: ['type'],
  serverCacheKey: ({ type }) => {
    return `opinions::${type}::header`
  },
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between
  border-bottom 2px solid #E9E9EA

  &-left, &-right
    display flex
    align-items center
    flex-wrap wrap

  &-left
    margin-right 15px

  .title
    font-size 1.6em
    color #111
    line-height 1.1
    margin-bottom 0
    white-space nowrap
    margin 18px 0
    margin-right 30px

  .link
    padding 5px 20px
    font-size 16px
    border-radius 15px
    color black
    line-height 1.1
    margin-right 10px

    &.active
      background #A3A2A2
      color white
      pointer-events none

  .subscribe
    color black
    text-decoration underline
    font-size 15px
    margin 15px 0
</style>
