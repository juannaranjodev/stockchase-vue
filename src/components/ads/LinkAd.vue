<template>
  <div>
    <div
      class="ad-container d-none d-md-block"
      v-if="shouldShowAd">
      <Adsense
        class="ad"
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="3572899802"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LinkAd',

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  }
}
</script>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0

  .ad
    width 1100px
    max-width 100%
    min-height 100px
    margin 0 auto

</style>
