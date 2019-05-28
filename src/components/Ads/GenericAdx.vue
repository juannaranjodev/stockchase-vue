<template>
  <div :id="slotId" />
</template>

<script>
/* global googletag */
import { mapGetters } from 'vuex';

export default {
  name: 'GenericAdx',

  props: {
    slotId: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters(['shouldShowAd']),
  },

  watch: {
    shouldShowAd(should) {
      if (!should) return;

      this.$nextTick(() => {
        googletag.cmd.push(() => { googletag.display(this.slotId); });
      });
    },
  },
};
</script>
