<template>
  <div
    v-if="shouldShowAd"
    class="ad-container"
  >
    <div class="ad">
      <no-ssr>
        <adsense
          data-ad-client="ca-pub-4241986024094799"
          data-ad-slot="5979276843"
          ins-class="in-feed-ad"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'InFeedAd',

  computed: {
    ...mapGetters(['shouldShowAd']),
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 30px 0

  .ad
    width 728px
    min-height 90px
    max-width 100%
    margin 0 auto

    >>> .in-feed-ad
      width 728px
      height 90px

</style>
