<template>
  <div class="banner-options-square">
    <wealthica-video />

    <p>
      What is Wealthica?
    </p>
  </div>
</template>

<script>
import WealthicaVideo from './WealthicaVideo.vue';

export default {
  name: 'WhatIsWealthica',
  components: { WealthicaVideo },
};
</script>

<style lang="stylus" scoped>
.banner-options-square
  padding 8px
  p
    color #6A269B
    font-size 18px
    line-height 20px
    font-weight bold
    margin 0
    margin-top 0
</style>
