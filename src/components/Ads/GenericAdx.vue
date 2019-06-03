<template>
  <div :id="slotId" />
</template>

<script>
/* global googletag */
/* eslint-disable max-len */
import { adxSlots } from './config';

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
      const adxSlot = adxSlots[this.slotId];

      googletag.cmd.push(() => {
        googletag.defineSlot(adxSlot[0], adxSlot[1], this.slotId).addService(googletag.pubads());
        googletag.display(this.slotId);
      });
    });
  },
};
</script>
