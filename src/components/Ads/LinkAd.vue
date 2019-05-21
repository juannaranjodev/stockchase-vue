<template>
  <div
    v-if="shouldShowAd"
    class="ad-container d-none d-lg-block"
  >
    <no-ssr>
      <adsense
        class="ad"
        data-ad-client="ca-pub-4241986024094799"
        :data-ad-slot="slotId"
        data-ad-format="link"
        data-full-width-responsive="true"
      />
    </no-ssr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LinkAd',

  props: {
    slotId: {
      type: String,
      default: '8007723438',
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

  &.compact
    padding-top 0
    padding-bottom 5px

  .ad
    width 1100px
    min-height 100px
    max-width 100%
    margin 0 auto

</style>
