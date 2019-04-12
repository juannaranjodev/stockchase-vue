<template>
  <div
    v-if="shouldShowAd"
    class="fixed-ad-container d-lg-none"
  >
    <div class="ad">
      <!-- Async AdSlot 9 for Ad unit 'stockchase.com_StickyBottom_Mobile_300x50' ### Size: [[300,50]] -->
      <!-- Adslot's refresh function: googletag.pubads().refresh([gptadslots[8]]) -->
      <div id="div-gpt-ad-9004875-9" />
      <!-- End AdSlot 9 -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MobileFooterAd',

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  },

  watch: {
    shouldShowAd(should) {
      if (!should) return

      this.$nextTick(() => {
        googletag.cmd.push(() => { googletag.display('div-gpt-ad-9004875-9') })
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.fixed-ad-container
  position fixed
  left 0
  right 0
  bottom 0
  height 55px
  padding-top 5px
  text-align center
  background-color #868484
  padding-bottom env(safe-area-inset-bottom)
  box-sizing initial

</style>
