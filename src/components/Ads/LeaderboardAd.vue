<template>
  <div
    v-if="shouldShowAd"
    class="ad-container"
  >
    <div class="ad">
      <no-ssr>
        <adsense
          data-ad-client="ca-pub-4241986024094799"
          :data-ad-slot="slotId"
          ins-class="leaderboard-ad"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LeaderboardAd',

  props: {
    slotId: {
      type: String,
      default: '5979276843',
    },
  },

  computed: {
    ...mapGetters(['shouldShowAd']),
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

  >>> .leaderboard-ad
    width 728px
    height 90px

</style>
