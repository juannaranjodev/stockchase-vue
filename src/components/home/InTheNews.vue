<template>
  <div class="in-the-news">
    <h1>Stocks In The News</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeInTheNews',
  serverCacheKey: () => {
    return `home::in-the-news`
  },
}
</script>

<style lang="stylus" scoped>
.in-the-news
  height 300px
  background-color rgba(0,0,0,0.1)

</style>
