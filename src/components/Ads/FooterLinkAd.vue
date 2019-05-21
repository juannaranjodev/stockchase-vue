<template>
  <link-ad :ad-slot="slotConfig" />
</template>

<script>
import { slots } from './config';
import LinkAd from './LinkAd.vue';

export default {
  name: 'FooterLinkAd',

  components: { LinkAd },

  props: {
    adSlot: {
      type: Array,
      default: undefined,
    },
  },

  computed: {
    slotConfig() {
      return this.adSlot || slots.FooterLink;
    },
  },
};
</script>
