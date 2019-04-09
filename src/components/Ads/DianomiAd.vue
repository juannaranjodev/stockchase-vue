<template>
  <div
    v-if="shouldShowAd"
    class="ad-container"
  >
    <iframe
      class="ad"
      width="1100"
      height="550"
      scrolling="NO"
      src="//www.dianomi.com/smartads.epl?id=4223"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DianomiAd',

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  }
}
</script>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0
  margin-bottom 20px

  .ad
    max-width 100%
    min-height 550px
    border none
    overflow hidden
    border none
</style>
