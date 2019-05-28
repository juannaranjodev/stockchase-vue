<template>
  <div class="ad">
    <generic-adx :slot-id="slotId" />
  </div>
</template>

<script>
import GenericAdx from './GenericAdx.vue';

export default {
  name: 'LinkAdx',

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
  width 1100px
  min-height 100px
  max-width 100%
  margin 0 auto
</style>
