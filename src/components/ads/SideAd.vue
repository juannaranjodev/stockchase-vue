<template>
  <div>
    <div
      class="ad-container d-none d-lg-block"
      v-if="shouldShowAd">
      <Adsense
        class="ad"
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="8310443638"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideAd',

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  }
}
</script>

<style lang="stylus" scoped>
.ad-container
  padding 0

  .ad
    width 300px
    height 300px
    margin 0 auto

</style>
