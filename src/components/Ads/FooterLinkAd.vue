<template>
  <link-ad :slot-id="slotId" />
</template>

<script>
import LinkAd from './LinkAd.vue';

export default {
  name: 'FooterLinkAd',

  components: { LinkAd },

  props: {
    slotId: {
      type: String,
      default: '3572899802',
    },
  },
};
</script>
