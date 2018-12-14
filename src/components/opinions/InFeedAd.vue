<template>
  <div>
    <div
      class="ad-container"
      v-if="shouldShowAd"
    >
      <!-- Async AdSlot 7 for Ad unit 'stockchase.com_SiteWideHorizontalMiddleTable_728x90_BTF_Flex' ### Size: [[728,90],'fluid'] -->
      <!-- Adslot's refresh function: googletag.pubads().refresh([gptadslots[6]]) -->
      <div id='div-gpt-ad-9004875-7'>
        <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-9004875-7'); });
        </script>
      </div>
      <!-- End AdSlot 7 -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OpinionsInFeedAd',

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  }
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
