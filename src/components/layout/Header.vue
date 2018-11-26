<template>
  <header class="header">
    <nav class="inner">
      <div class="inner-left">
        <a class="home" :href="appUrl">
          <img class="d-none d-md-inline" width="40" src="~assets/svgs/logo.svg" alt="logo">
          <img class="d-md-none" width="34" src="~assets/svgs/logo_red.svg" alt="logo">
        </a>
        <header-search />
      </div>
      <div class="inner-right">
        <a class="link d-none d-lg-block" href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Top%20Link&utm_term=Net%20Worth%20Tracking">Net worth tracking</a>
        <a class="link d-none d-lg-block" href="https://app.monstercampaigns.com/c/pyfvvozlgjmvfiny48bx/">Free 72 rules eBook</a>
        <header-auth />
      </div>
    </nav>
  </header>
</template>

<script>
import * as c from '../../constants'

import HeaderAuth from './HeaderAuth.vue'
import HeaderSearch from './HeaderSearch.vue'

export default {
  name: 'site-header',

  components: {
    HeaderAuth,
    HeaderSearch
  },

  data () {
    return {
      appUrl: c.APP_URL,
    }
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

@media (max-width 767px)
  .header
    background-color transparent
    border-bottom 1px solid rgba(#282B31, 0.1)
    height 76px

    .home
      margin 0 4px 0 0

    .inner
      padding 15px 10px
      flex-wrap nowrap

      &-left
        margin-right 4px
        flex-grow 1

</style>
