<template>
  <div
    v-if="user.loaded && !user.premium"
    class="banner-options-square"
  >
    <a
      href="https://stockchase.com/premium/?utm_medium=Stockchase&amp;utm_source=Internal_Links&amp;utm_content=Premium&amp;utm_campain=Stockchase"
      title="Unlock Experts Ratings"
    >
      <img
        src="~assets/images/lock-star.png"
        alt="Unlock Experts Ratings"
      >
      <p>
        Unlock <br>experts ratings
      </p>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UnlockExpertRatings',

  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style lang="stylus" scoped>
.banner-options-square a
  text-decoration none
  display block
  padding 14px
  text-align center
  img
    width 40px
  p
    color red
    font-size 18px
    line-height 20px
    font-weight bold
    margin 0
    margin-top 10px
</style>
