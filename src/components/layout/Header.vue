<template>
  <header class="header">
    <nav class="inner">
      <div class="inner-left">
        <a
          v-if="user.premium"
          class="home"
          href="/">
          <img
            class="d-none d-lg-inline"
            width="45"
            src="~assets/svgs/logo_premium.svg"
            alt="logo">
          <img
            class="d-lg-none"
            width="42"
            src="~assets/svgs/logo_premium_red.svg"
            alt="logo">
        </a>
        <a
          v-else
          class="home"
          href="/">
          <img
            class="d-none d-lg-inline"
            width="40"
            src="~assets/svgs/logo.svg"
            alt="logo">
          <img
            class="d-lg-none"
            width="37"
            src="~assets/svgs/logo_red.svg"
            alt="logo">
        </a>
        <header-search />
      </div>
      <div class="inner-right">
        <a
          class="link d-none d-lg-block"
          href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Top%20Link&utm_term=Net%20Worth%20Tracking">Net worth tracking</a>
        <a
          class="link d-none d-lg-block"
          href="https://app.monstercampaigns.com/c/pyfvvozlgjmvfiny48bx/">Free 72 rules eBook</a>
        <header-auth />
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderAuth from './HeaderAuth.vue'
import HeaderSearch from './HeaderSearch.vue'

export default {
  name: 'SiteHeader',

  components: {
    HeaderAuth,
    HeaderSearch
  },

  computed: {
    ...mapGetters(['user'])
  },
}
</script>

<style lang="stylus" scoped>
.header
  background-color #EC4D4B

  .home
    margin 18px 20px 18px 0
    display flex
    align-items center

  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto
    display flex
    align-items center
    justify-content space-between

    &-left, &-right
      display flex
      align-items center

    &-left
      margin-right 18px

    &-right
      /* overflow hidden */

  a.link
    font-family Montserrat, san-serif;
    font-weight 400
    color white
    text-decoration none
    margin-right 2em
    padding 5px 0
    display block
    white-space nowrap

    &:hover
      color white

    &:last-child
      margin-right 1.1em

@media (max-width 991px)
  .header
    background-color transparent

    .home
      margin 0 9px 0 0

    .inner
      padding 15px 10px
      flex-wrap nowrap

      &-left
        margin-right 20px
        flex-grow 1

</style>
