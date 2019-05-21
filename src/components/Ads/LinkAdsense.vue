<template>
  <div class="ad">
    <no-ssr>
      <adsense
        :data-ad-client="adsenseClient"
        :data-ad-slot="slotId"
        data-ad-format="link"
        :data-full-width-responsive="true"
        ins-class="link-ad"
      />
    </no-ssr>
  </div>
</template>

<script>
import { adsenseClient } from './config';

export default {
  name: 'LinkAdsense',

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
  width 1100px
  min-height 100px
  max-width 100%
  margin 0 auto
</style>
