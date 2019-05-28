<template>
  <div
    v-if="shouldShowAd && slotConfig"
    class="ad-container d-none d-lg-block"
  >
    <link-adsense
      v-if="slotConfig[0] === 'adsense'"
      :slot-id="slotConfig[1]"
    />
    <link-adx
      v-if="slotConfig[0] === 'adx'"
      :slot-id="slotConfig[1]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slots } from './config';
import LinkAdsense from './LinkAdsense.vue';
import LinkAdx from './LinkAdx.vue';

export default {
  name: 'LinkAd',

  components: {
    LinkAdsense,
    LinkAdx,
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
      return this.adSlot || slots.Link;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0

  &.compact
    padding-top 0
    padding-bottom 5px
</style>
