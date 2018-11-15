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
        <div v-if="loggedIn" class="header-auth">
          <b-dropdown ref="userDropdown" right class="user-dropdown" toggle-class="user-dropdown-toggle" @mouseover.native="onMouseOver" @mouseleave.native="onMouseLeave">
            <b-dropdown-item :href="`${appUrl}/profile`">My Profile</b-dropdown-item>
            <b-dropdown-item :href="`${appUrl}/portfolio`">My Watch List</b-dropdown-item>
            <b-dropdown-item :href="`${appUrl}/auth/logout`" @click="logout">Logout</b-dropdown-item>
            <template slot="button-content">
              <div class="user-dropdown-label">
                <img class="user-avatar" src="//www.gravatar.com/avatar/9c72d48f553285affbea973117684b63" width="25">
                <span class="user-name">codynguyen</span>
                <img class="user-dropdown-arrow" src="~assets/svgs/white-arrow-down.svg" width="20">
              </div>
            </template>
          </b-dropdown>
        </div>
        <div v-else class="header-auth">
          <a class="button button-white button-white-login button-login" :href="appUrl + '/member/login'" @click="login">Login</a>
          <a class="button button-orange button-orange-signup button-signup" :href="appUrl + '/member/signup'">Sign Up</a>
        </div>
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
      loggedIn: false,
    }
  },

  methods: {
    login(e) {
      e.preventDefault()
      this.loggedIn = true
    },

    logout(e) {
      e.preventDefault()
      this.loggedIn = false
    },

    onMouseOver() {
      this.$refs.userDropdown.show()
    },

    onMouseLeave() {
      this.$refs.userDropdown.hide()
    }
  }
}
</script>

<style lang="stylus">
.user
  &-dropdown
    height 45px

    .dropdown-menu
      margin-top -5px
      padding 0
      box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
      width 128px
      border 0
      min-width 0

    .dropdown-item
      color #000000
      font-size 14px
      padding 12px 16px !important
      font-weight bold
      text-decoration none
      background-color #F9F9F9
      line-height 1

      &:first-child
        border-top-left-radius 5px
        border-top-right-radius 5px

      &:last-child
        border-bottom-left-radius 5px
        border-bottom-right-radius 5px

      &:hover
        background-color #F1F1F1
        color red

    &-toggle
      padding 0
      background-color transparent !important
      border 0 !important

      &:after
        display none

    &-label
      display flex
      align-items center

  &-avatar
    border-radius 100px
    margin-right 13px

  &-name
    margin-right 13px
    color white
    font-weight bold

</style>

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

  &-auth
    margin-left 1.1em

    .button-login, .button-signup
      display inline-block
      text-transform uppercase
      text-decoration none
      padding 0.8em 0
      border-radius 4px
      width 80px
      text-align center
      &:hover
        text-decoration underline

    .button-login
      border 1px solid #E1E1E1
      color white
      font-weight 400
      margin-right .5em
      &:hover
        text-decoration underline

    .button-signup
      border-radius 4px
      border 1px solid white
      background white
      color #FF2E50

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
