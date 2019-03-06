<template>
  <div class="market-outlook">
    <h1 class="market-outlook__title">Today's Market Outlook</h1>
    <div class="market-outlook__subtitle">
      <a href="/opinions/market">Read all answers</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMarketOutlook',
  serverCacheKey: () => {
    return `home::market-outlook`
  },
}
</script>

<style lang="stylus" scoped>
.market-outlook
  padding 20px 0

  &__title
    font-size 1.7em
    margin-bottom 5px
    font-weight bold
    text-transform uppercase
    text-align center

  &__subtitle
    text-align center
    a
      color #FF2E50
      text-decoration underline


</style>
