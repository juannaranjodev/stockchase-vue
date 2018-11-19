<template>
  <div>
    <div class="ad-container" v-if="shouldShowAd">
      <InFeedAdsense
        class='ad'
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="5979276843">
      </InFeedAdsense>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'opinions-in-feed-ad',
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: () => {
    return `opinions::in-feed-ad`
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
  padding 30px 0

  .ad
    width 728px
    max-width 100%
    height 90px
    margin 0 auto

</style>
