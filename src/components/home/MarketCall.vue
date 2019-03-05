<template>
  <div class="market-call">
    <h1>STOCK PICKS @MARKETCALL</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeMarketCall',
  serverCacheKey: () => {
    return `home::market-call`
  },
}
</script>

<style lang="stylus" scoped>
.market-call
  height 300px
  background-color rgba(0,0,0,0.1)

</style>
