<template>
  <div class="header-auth">
    <div v-if="user.username">
      <b-dropdown
        ref="userDropdown"
        right
        class="user-dropdown"
        toggle-class="user-dropdown-toggle"
        @mouseover.native="onMouseOver"
        @mouseleave.native="onMouseLeave">
        <b-dropdown-item href="/profile">My Profile</b-dropdown-item>
        <b-dropdown-item href="/portfolio">My Watch List</b-dropdown-item>

        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/opinions">Opinions Advanced Filters (Table View)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/experts">Experts Advanced Filters (Table View)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/companies">Company Advanced Filters (Table View)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/admin">Site Management</b-dropdown-item>

        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/blog/admin">Blog Posts (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/page/admin">Static Pages (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/admin/ads">Text Ad Editor (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/admin/pix">Image Manager (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/admin/editor">Editor Functions (Editor)</b-dropdown-item>

        <b-dropdown-item
          v-if="user.admin"
          href="/auth/index">User Editor (Admin)</b-dropdown-item>

        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/region">Region (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/sector">Sector (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/bias">Bias (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/topic">Topic (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/source">Source (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/signal">Signal (Editor)</b-dropdown-item>
        <b-dropdown-item
          v-if="user.editor || user.admin"
          href="/tables/ad">Advertising (Editor)</b-dropdown-item>

        <b-dropdown-item href="/auth/logout">Logout</b-dropdown-item>
        <template slot="button-content">
          <div class="user-dropdown-label">
            <div class="user-avatar">
              <gravatar
                :class="{'user-avatar__image': true, 'user-avatar__image--premium': user.premium}"
                :email="user.email"
                :size="82"
                default-img=""
              />
              <img
                v-if="user.premium"
                class="user-avatar__badge"
                width="24"
                src="~assets/svgs/badge_premium.svg">
            </div>
            <span class="user-name d-none d-lg-block">{{ user.username }}</span>
            <img
              class="user-dropdown-arrow d-none d-lg-inline"
              src="~assets/svgs/white-arrow-down.svg"
              width="20">
            <img
              class="user-dropdown-arrow d-lg-none"
              src="~assets/svgs/arrow_down.svg"
              width="8">
          </div>
        </template>
      </b-dropdown>
    </div>
    <div
      v-else
      :class="{'header-auth__buttons': true, 'hidden': !fetched}">
      <a
        class="button button-outline button-login d-none d-lg-block"
        href="/member/login">Login</a>
      <a
        class="button button-white button-signup d-none d-lg-block"
        href="/member/signup">Sign Up</a>
      <a
        class="button button-red button-mobile button-mobile-signup d-lg-none"
        href="/member/signup">Join</a>
      <a
        class="button button-outline button-mobile d-lg-none"
        href="/member/login"><img
          src="~assets/images/user-icon.png"
          width="20"></a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
  name: 'HeaderAuth',

  components: { Gravatar },

  data () {
    return {
      fetched: false,
    }
  },

  computed: {
    ...mapGetters(['user'])
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
    max-width 100%
    height 45px
    margin 18px 0

    .dropdown-menu
      margin-top -5px
      padding 0
      box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
      min-width 128px
      border 0

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
      max-width 100%

      &:after
        display none !important

    &-label
      display flex
      align-items center

  &-avatar
    margin-right 13px
    position relative

    &__image
      border-radius 100px
      width 25px
      height 25px

      &--premium
        width 41px
        height 41px

    &__badge
      position absolute
      right -4px
      bottom -8px

  &-name
    display block
    margin-right 13px
    line-height 1.2
    text-align left
    color white
    font-weight bold
    white-space normal

@media (max-width 991px)
  .user
    &-dropdown
      margin 0

    &-avatar
      margin-right 3px
</style>

<style lang="stylus" scoped>
.header-auth
  max-width 100%

  &__buttons
    display flex
    align-items center

    &.hidden
      visibility hidden
      pointer-events none

  .button
    display inline-block
    text-transform uppercase
    text-decoration none
    padding 0.8em 0
    border-radius 4px
    text-align center
    margin 18px 0
    font-weight 400
    &:hover
      text-decoration underline

  .button-outline
    border 1px solid #E1E1E1
    color white

  .button-white
    border 1px solid white
    background white
    color #FF2E50

  .button-red
    border 1px solid #FF5030
    background #FF5030
    color white

    &:hover
      border-color #FF2E50
      background #FF2E50

  .button-login, .button-signup
    width 80px

  .button-login
    margin-right .5em

  .button-mobile
    padding 0
    height 31px
    min-width 38px
    display inline-flex
    align-items center
    justify-content center
    font-size 12px

    &-signup
      width 40px
      margin-right 4px

@media (max-width 991px)
  .header-auth
    &__buttons
      &.hidden
        display none

    .button
      margin-top 0
      margin-bottom 0

</style>
