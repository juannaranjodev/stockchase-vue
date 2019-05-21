<template>
  <div class="ad">
    <no-ssr>
      <adsense
        :data-ad-client="adsenseClient"
        :data-ad-slot="slotId"
        ins-class="in-feed-ad"
      />
    </no-ssr>
  </div>
</template>

<script>
import { adsenseClient } from './config';

export default {
  name: 'InFeedAdsense',

  props: {
    slotId: {
      type: String,
      default: '',
    },
  },

  computed: {
    adsenseClient: () => adsenseClient,
  },
};
</script>

<style lang="stylus" scoped>
.ad
  width 728px
  min-height 90px
  max-width 100%
  margin 0 auto

  >>> .in-feed-ad
    width 728px
    height 90px

</style>
