<template>
  <div
    v-if="shouldShowAd"
    class="ad-container d-none d-lg-block"
  >
    <div class="ad">
      <!-- Async AdSlot 8 for Ad unit 'stockchase.com_SiteWideHorizontalTop_Desktop_728x90_ATF_Flex'
           ### Size: [[728,90]] -->
      <!-- Adslot's refresh function: googletag.pubads().refresh([gptadslots[7]]) -->
      <div id="div-gpt-ad-9004875-8" />
      <!-- End AdSlot 8 -->
    </div>
  </div>
</template>

<script>
/* global googletag */
import { mapGetters } from 'vuex';

export default {
  name: 'LeaderboardAdx',
  computed: {
    ...mapGetters(['shouldShowAd']),
  },
  watch: {
    shouldShowAd(should) {
      if (!should) return;

      this.$nextTick(() => {
        googletag.cmd.push(() => { googletag.display('div-gpt-ad-9004875-8'); });
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0
  background rgba(248, 248, 248, 0.7)
  border-bottom 1px solid #D9D9D9

  .ad
    width 728px
    max-width 100%
    min-height 90px
    margin 0 auto
</style>
