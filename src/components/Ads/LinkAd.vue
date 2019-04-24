<template>
  <div
    v-if="shouldShowAd"
    class="ad-container d-none d-lg-block"
  >
    <adsense
      class="ad"
      data-ad-client="ca-pub-4241986024094799"
      data-ad-slot="3572899802"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LinkAd',

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
    max-width 100%
    min-height 100px
    margin 0 auto

</style>
