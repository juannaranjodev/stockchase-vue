<template>
  <div class="mobile-wealthica-video">
    <a
      class="mobile-wealthica-video__link"
      href="https://wealthica.com/?utm_expid=.U05s0OyERYusHu-qbBtkfw.0&utm_referrer="
      target="_blank"
    >
      <img
        src="~assets/svgs/wealthica-logo.svg"
        height="24"
      >
      <h2>See all your investments in one place.</h2>
    </a>

    <wealthica-video />
  </div>
</template>

<script>
import WealthicaVideo from './WealthicaVideo.vue';

export default {
  name: 'MobileWealthicaVideo',
  components: { WealthicaVideo },
};
</script>

<style lang="stylus" scoped>
.mobile-wealthica-video
  padding 10px 20px 5px
  background #f6f6f6
  border 1px solid #E9E9EA
  display flex
  flex-direction column
  align-items center
  justify-content center
  text-align center

  &__link
    display flex
    flex-direction column
    align-items center
    justify-content center
    text-decoration none
    margin-bottom 5px

    h2
      margin-top 10px
      font-size 20px
      font-weight normal
      color #111
      line-height 1.1

</style>
