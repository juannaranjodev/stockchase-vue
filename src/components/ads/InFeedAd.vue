<template>
  <div>
    <div
      class="ad-container"
      v-if="shouldShowAd"
    >
      <div class="ad">
        <Adsense
          data-ad-client="ca-pub-4241986024094799"
          data-ad-slot="5979276843"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InFeedAd',

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  },
}
</script>

<style lang="stylus" scoped>
.ad-container
  padding 30px 0

  .ad
    width 728px
    max-width 100%
    min-height 90px
    margin 0 auto

</style>
