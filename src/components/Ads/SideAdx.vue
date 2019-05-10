<template>
  <div
    v-if="shouldShowAd"
    class="ad-container d-none d-lg-block"
  >
    <div class="ad">
      <div :id="slotId" />
    </div>
  </div>
</template>

<script>
/* global googletag */
import { mapGetters } from 'vuex';

export default {
  name: 'SideAdx',
  props: {
    slotId: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['shouldShowAd']),
  },
  watch: {
    shouldShowAd(should) {
      if (!should) return;
      this.$nextTick(() => {
        googletag.cmd.push(() => { googletag.display(this.slotId); });
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 0
  .ad
    width 300px
    height 250px
    margin 0 auto
</style>
