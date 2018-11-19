<template>
  <header class="header">
    <nav class="inner">
      <div class="inner-left">
        <a class="home" :href="appUrl">
          <img src="~assets/svgs/stockchase_white_logo.svg" alt="logo">
        </a>
        <header-search />
      </div>
      <div class="inner-right">
        <a class="link" href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Top%20Link&utm_term=Net%20Worth%20Tracking">Net worth tracking</a>
        <a class="link" href="https://app.monstercampaigns.com/c/pyfvvozlgjmvfiny48bx/">Free 72 rules eBook</a>
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

    img
      width 40px

  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto
    display flex
    align-items center
    justify-content space-between
    flex-wrap wrap

    &-left, &-right
      display flex
      align-items center
      flex-wrap wrap

    &-left
      margin-right 18px

    &-right
      flex-wrap wrap

  a.link
    font-family Montserrat, san-serif;
    font-weight 400
    color white
    text-decoration none
    margin-right 2em
    padding 5px 0
    &:hover
      color white

    &:last-child
      margin-right 1.1em

@media (max-width 767px)
  .header .inner
    padding 15px

@media (max-width 767px)
  .header .inner-left
    display block

</style>
