<template>
  <div class="triple-ads clear d-none d-lg-block">
    <div class="triple-ads__content">
      <p><slot /></p>
    </div>
    <div class="triple-ads__banners">
      <unlock-expert-ratings />
      <what-is-wealthica />
      <ask-peter-hodson />
    </div>
  </div>
</template>

<script>
import UnlockExpertRatings from './UnlockExpertRatings.vue';
import WhatIsWealthica from './WhatIsWealthica.vue';
import AskPeterHodson from './AskPeterHodson.vue';

export default {
  name: 'TripleAds',

  components: {
    UnlockExpertRatings,
    WhatIsWealthica,
    AskPeterHodson,
  },
};
</script>

<style lang="stylus" scoped>
.triple-ads
  border-top 11px solid #474747
  border-bottom 11px solid #474747
  padding 11px 0

  &__content
    width 31%
    font-size 18px
    color #595959
    display inline-block

    p
      text-align center
      margin 0
      a
        color red

  &__banners
    float right

  >>> .banner-options-square
    background #F6F6F6
    border 1px solid #E7E6E6
    width 200px
    height 100px
    border-radius 5px
    text-align center
    display inline-block
    vertical-align top
    margin-left 15px

</style>
