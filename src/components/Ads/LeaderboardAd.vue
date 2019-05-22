<template>
  <div
    v-if="shouldShowAd && slotConfig"
    class="ad-container d-none d-lg-block"
  >
    <leaderboard-adsense
      v-if="slotConfig[0] === 'adsense'"
      :slot-id="slotConfig[1]"
    />
    <leaderboard-adx
      v-if="slotConfig[0] === 'adx'"
      :slot-id="slotConfig[1]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slots } from './config';
import LeaderboardAdsense from './LeaderboardAdsense.vue';
import LeaderboardAdx from './LeaderboardAdx.vue';

export default {
  name: 'LeaderboardAd',

  components: {
    LeaderboardAdsense,
    LeaderboardAdx,
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
      return this.adSlot || slots.Leaderboard;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0
  background rgba(248, 248, 248, 0.7)
  border-bottom 1px solid #D9D9D9
</style>
