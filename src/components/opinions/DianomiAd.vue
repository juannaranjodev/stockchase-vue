<template>
  <div>
    <div class="ad-container" v-if="shouldShowAd">
      <iframe class="ad" width="1100" height="550" scrolling="NO" src="//www.dianomi.com/smartads.epl?id=4223"></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'opinions-dianomi-ad',
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: () => {
    return `opinions::dianomi-ad`
  },

  computed: {
    ...mapGetters([ 'user' ]),

    userLoaded() {
      return this.user.loaded
    },

    adFree() {
      return this.user.ad_free
    },

    shouldShowAd() {
      return this.userLoaded && !this.adFree
    },
  }
}
</script>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0
  margin-bottom 20px

  .ad
    max-width 100%
    height 550px
    border none
    overflow hidden
    border none
</style>
