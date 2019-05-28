<template>
  <div class="ad">
    <no-ssr>
      <adsense
        :data-ad-client="adsenseClient"
        :data-ad-slot="slotId"
        ins-class="mobile-footer-ad"
      />
    </no-ssr>
  </div>
</template>

<script>
import { adsenseClient } from './config';

export default {
  name: 'MobileFooterAdsense',

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
  width 300px
  min-height 50px
  max-width 100%
  margin 0 auto

  >>> .mobile-footer-ad
    width 300px
    height 50px

</style>
