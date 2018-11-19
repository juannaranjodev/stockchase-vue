<template>
  <div>
    <div class="ad-container" v-if="shouldShowAd">
      <Adsense
        class='ad'
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="3572899802">
      </Adsense>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'opinions-link-ad',
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: () => {
    return `opinions::link-ad`
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
    width 1100px
    max-width 100%
    height 100px
    margin 0 auto

</style>
