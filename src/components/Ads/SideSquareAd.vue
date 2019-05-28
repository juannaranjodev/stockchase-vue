<template>
  <div
    v-if="shouldShowAd && slotConfig"
    class="ad-container d-none d-lg-block"
  >
    <side-square-adsense
      v-if="slotConfig[0] === 'adsense'"
      :slot-id="slotConfig[1]"
    />
    <side-square-adx
      v-if="slotConfig[0] === 'adx'"
      :slot-id="slotConfig[1]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slots } from './config';
import SideSquareAdsense from './SideSquareAdsense.vue';
import SideSquareAdx from './SideSquareAdx.vue';

export default {
  name: 'SideSquareAd',

  components: {
    SideSquareAdsense,
    SideSquareAdx,
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
      return this.adSlot || slots.SideSquare;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 0
</style>
