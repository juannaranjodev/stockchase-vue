<template>
  <div
    v-if="shouldShowAd"
    class="ad-container d-none d-lg-block"
  >
    <div class="ad">
      <no-ssr>
        <in-article-adsense
          data-ad-client="ca-pub-4241986024094799"
          data-ad-slot="7415387688"
          ins-class="side-ad"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideAd',

  computed: {
    ...mapGetters(['shouldShowAd']),
  },
};
</script>

<style lang="stylus" scoped>
.ad-container
  padding 0

  .ad
    width 300px
    max-height 300px
    margin 0 auto

    >>> .side-ad
      width 300px
      height 250px

</style>
