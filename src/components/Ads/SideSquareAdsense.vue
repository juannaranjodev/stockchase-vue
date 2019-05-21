<template>
  <div class="ad">
    <no-ssr>
      <in-article-adsense
        :data-ad-client="adsenseClient"
        :data-ad-slot="slotId"
        ins-class="side-square-ad"
      />
    </no-ssr>
  </div>
</template>

<script>
import { adsenseClient } from './config';

export default {
  name: 'SideSquareAdsense',

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
  max-height 300px
  margin 0 auto

  >>> .side-square-ad
    width 300px
    height 250px
</style>
