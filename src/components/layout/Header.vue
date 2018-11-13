<template>
  <header class="header">
    <nav class="inner">
      <div class="inner-left">
        <a :href="appUrl">
          <img class="logo" src="~assets/svgs/stockchase_white_logo.svg" alt="logo">
        </a>
        <input class="nav-search" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="Search for Company, Expert, or keyword...">
      </div>
      <div class="inner-right">
        <a class="link" href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Top%20Link&utm_term=Net%20Worth%20Tracking">Net worth tracking</a>
        <a class="link" href="https://app.monstercampaigns.com/c/pyfvvozlgjmvfiny48bx/">Free 72 rules eBook</a>
        <a class="button button-white button-white-login button-login" :href="appUrl + '/member/login'">Login</a>
        <a class="button button-orange button-orange-signup button-signup" :href="appUrl + '/member/signup'">Sign Up</a>
      </div>
    </nav>
  </header>
</template>

<script>
import * as c from '../../constants'

export default {
  name: 'site-header',

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

  .button-login
    display inline-block
    text-transform uppercase
    text-decoration none
    padding 0.8em 1em
    border-radius 4px
    border 1px solid #E1E1E1
    color white
    font-weight 400
    padding-left 1.3em
    padding-right 1.3em
    margin-right .5em
    margin-left 1.1em
    &:hover
      text-decoration underline

  .button-signup
    display inline-block
    text-transform uppercase
    text-decoration none
    padding 0.8em 1em
    border-radius 4px
    border 1px solid white
    background white
    color #FF2E50
    &:hover
      text-decoration underline

  .nav-search
    padding 5px 10px
    line-height 1.6
    display block
    margin 0
    margin-left 20px
    height 41px
    border none
    border-radius 4px
    width 360px
    outline 0
    box-shadow none
    -webkit-appearance textfield

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
</style>
