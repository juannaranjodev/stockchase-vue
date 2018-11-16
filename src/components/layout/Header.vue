<template>
  <header class="header">
    <nav class="inner">
      <div class="inner-left">
        <a :href="appUrl">
          <img class="logo" src="~assets/svgs/stockchase_white_logo.svg" alt="logo">
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
  height 82px
  display flex
  align-items center

  .logo
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

    &-left, &-right
      display flex
      align-items center

  a.link
    font-family Montserrat, san-serif;
    font-weight 400
    color white
    text-decoration none
    margin-left 2em
    &:hover
      color white

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
</style>
