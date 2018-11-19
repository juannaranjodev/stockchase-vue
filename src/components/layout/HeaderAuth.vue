<template>
  <div class="header-auth">
    <div v-if="user.username">
      <b-dropdown ref="userDropdown" right class="user-dropdown" toggle-class="user-dropdown-toggle" @mouseover.native="onMouseOver" @mouseleave.native="onMouseLeave">
        <b-dropdown-item :href="`${appUrl}/profile`">My Profile</b-dropdown-item>
        <b-dropdown-item :href="`${appUrl}/portfolio`">My Watch List</b-dropdown-item>
        <b-dropdown-item :href="`${appUrl}/auth/logout`">Logout</b-dropdown-item>
        <template slot="button-content">
          <div class="user-dropdown-label">
            <gravatar
              class="user-avatar"
              :email="user.email"
              :size="50"
              default-img=""
            />
            <span class="user-name">{{ user.username }}</span>
            <img class="user-dropdown-arrow" src="~assets/svgs/white-arrow-down.svg" width="20">
          </div>
        </template>
      </b-dropdown>
    </div>
    <div v-else :class="{'hidden': !fetched}">
      <a class="button button-white button-white-login button-login" :href="appUrl + '/member/login'">Login</a>
      <a class="button button-orange button-orange-signup button-signup" :href="appUrl + '/member/signup'">Sign Up</a>
    </div>
  </div>
</template>

<script>
import * as c from '../../constants'
import Gravatar from 'vue-gravatar'

export default {
  name: 'header-auth',

  components: { Gravatar },

  data () {
    return {
      appUrl: c.APP_URL,
      fetched: false,
    }
  },

  computed: {
    user () {
      return this.$store.getters.user
    },
  },

  methods: {
    onMouseOver() {
      this.$refs.userDropdown.show()
    },

    onMouseLeave() {
      this.$refs.userDropdown.hide()
    },

    fetchUser() {
      this.$store.dispatch('FETCH_USER').always(() => {
        this.fetched = true
      })
    }
  },

  beforeMount () {
    this.fetchUser()
  },
}
</script>

<style lang="stylus">
.user
  &-dropdown
    height 45px
    margin 18px 0

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
      outline 0 !important
      box-shadow none !important

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
      padding 0 !important
      background-color transparent !important
      border 0 !important
      outline 0 !important
      box-shadow none !important

      &:after
        display none !important

    &-label
      display flex
      align-items center

  &-avatar
    border-radius 100px
    margin-right 13px
    width 25px
    height 25px

  &-name
    margin-right 13px
    color white
    font-weight bold

</style>

<style lang="stylus" scoped>
.header-auth
  & > .hidden
    visibility hidden
    pointer-events none

  .button-login, .button-signup
    display inline-block
    text-transform uppercase
    text-decoration none
    padding 0.8em 0
    border-radius 4px
    width 80px
    text-align center
    margin 18px 0
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

</style>
