<template>
  <div class="ad">
    <generic-adx :slot-id="slotId" />
  </div>
</template>

<script>
import GenericAdx from './GenericAdx.vue';

export default {
  name: 'MobileFooterAdx',

  components: { GenericAdx },

  props: {
    slotId: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus" scoped>
.ad
  width 300px
  max-width 100%
  min-height 50px
  margin 0 auto
</style>
