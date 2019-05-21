<template>
  <div
    v-if="shouldShowAd && slotConfig"
    class="fixed-ad-container d-lg-none"
  >
    <mobile-footer-adsense
      v-if="slotConfig[0] === 'adsense'"
      :slot-id="slotConfig[1]"
    />
    <mobile-footer-adx
      v-if="slotConfig[0] === 'adx'"
      :slot-id="slotConfig[1]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slots } from './config';
import MobileFooterAdsense from './MobileFooterAdsense.vue';
import MobileFooterAdx from './MobileFooterAdx.vue';

export default {
  name: 'MobileFooterAd',

  components: {
    MobileFooterAdsense,
    MobileFooterAdx,
  },

  props: {
    adSlot: {
      type: Array,
      default: undefined,
    },
  },

  computed: {
    ...mapGetters(['shouldShowAd']),

    slotConfig() {
      return this.adSlot || slots.MobileFooter;
    },
  },
};
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
