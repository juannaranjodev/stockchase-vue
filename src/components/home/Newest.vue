<template>
  <div class="newest">
    <div class="newest-section">
      <h3 class="newest-section__title">Newest Companies</h3>
      <div class="newest-section__links">
        <a
          v-for="index in 6"
          :key="index"
          href="https://stockchase.com/company/view/6002/0/YETI-Holdings--Inc./YETI-Q"
          class="newest-section__link"
        >
          <strong>YETI-Q</strong>
          <span>, YETI Holdings, Inc. YETI Holdings, Inc.</span>
        </a>
      </div>
      <hr class="home-divider">
    </div>

    <div class="newest-section">
      <h3 class="newest-section__title">Newest Expert</h3>
      <div class="newest-section__links">
        <a
          v-for="index in 6"
          :key="index"
          href="https://stockchase.com/company/view/6002/0/YETI-Holdings--Inc./YETI-Q"
          class="newest-section__link"
        >
          <strong>Andrew Pyle</strong>
          <span>, Senior wealth advisor Senior wealth advisor</span>
        </a>
      </div>
      <hr class="home-divider">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNewest',
  serverCacheKey: () => {
    return `home::newest`
  },
}
</script>

<style lang="stylus" scoped>
.newest
  &-section
    margin-bottom 25px

    &__title
      color #FF2E50
      font-weight bold
      font-size 13px
      margin-bottom 25px
      text-transform uppercase

    &__link
      display block
      font-size 1.1em
      color black
      text-decoration none
      line-height 1.4em
      margin-bottom .6em
      white-space nowrap
      overflow hidden
      text-overflow ellipsis

</style>
