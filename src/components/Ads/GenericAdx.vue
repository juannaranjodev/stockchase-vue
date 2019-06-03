<template>
  <div :id="slotId" />
</template>

<script>
/* global googletag */
export default {
  name: 'GenericAdx',

  props: {
    slotId: {
      type: String,
      default: '',
    },
  },

  mounted() {
    this.$nextTick(() => {
      googletag.cmd.push(() => { googletag.display(this.slotId); });
    });
  },
};
</script>
