<template>
  <div
    v-if="shouldShowAd && slotConfig"
    class="ad-container d-none d-lg-block"
  >
    <in-feed-adsense
      v-if="slotConfig[0] === 'adsense'"
      :slot-id="slotConfig[1]"
    />
    <in-feed-adx
      v-if="slotConfig[0] === 'adx'"
      :slot-id="slotConfig[1]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slots } from './config';
import InFeedAdsense from './InFeedAdsense.vue';
import InFeedAdx from './InFeedAdx.vue';

export default {
  name: 'InFeedAd',

  components: {
    InFeedAdsense,
    InFeedAdx,
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
      return this.adSlot || slots.InFeed;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 30px 0
</style>
