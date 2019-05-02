<template>
  <div class="expert-top-picks">
    <h1>Expert top picks here</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TopPicks',

  computed: {
    ...mapGetters(['expert']),
  },
};
</script>

<style lang="stylus" scoped>
.expert-top-picks
  h1
    color red

</style>
