<template>
  <div :class="{ 'welcome-back': loggedIn, 'welcome-back--premium': user.premium, 'sign-up': !loggedIn }">
    <div
      v-if="loggedIn"
      class="welcome-back__container"
    >
      <h2 class="welcome-back__title">Welcome back {{ user.name }} !</h2>
      <div class="welcome-back__subtitle">You are watching {{ user.UserStocks.length }} stocks.</div>
      <div class="welcome-back__links">
        <a
          href="/portfolio"
          class="welcome-back__link"
        >
          <span class="welcome-back__link-image">
            <img
              src="~assets/images/eye-watch.png"
              width="20"
            >
          </span>
          <span class="welcome-back__link-text">Watch List</span>
        </a>
        <a
          href="/opinions/portfolio"
          class="welcome-back__link"
        >
          <span class="welcome-back__link-image">
            <img
              src="~assets/images/feed.png"
              width="15"
            >
          </span>
          <span class="welcome-back__link-text">Your Feed</span>
        </a>
        <a
          href="/profile"
          class="welcome-back__link"
        >
          <span class="welcome-back__link-image">
            <img
              src="~assets/images/profile.png"
              width="20"
            >
          </span>
          <span class="welcome-back__link-text">Your Profile</span>
        </a>
      </div>
      <a
        class="welcome-back__upgrade"
        href="https://stockchase.com/premium/?utm_medium=Stockchase&utm_source=Internal_Links&utm_content=Premium&utm_campain=Stockchase"
      >Upgrade to Reveal Experts Ratings</a>
    </div>

    <div
      v-else
      class="sign-up__container"
    >
      <h2 class="sign-up__title">
        Sign up for Stockchase free now.
        <br>
        Join <span>31,265</span> investors.
      </h2>

      <form
        class="sign-up__form"
        method="get"
        action="/member/signup"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email address..."
          required="required"
          class="sign-up__input"
        >
        <button class="sign-up__button">SIGN ME UP</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeSignUp',

  computed: {
    ...mapGetters([ 'loggedIn', 'user' ]),
  }
}
</script>

<style lang="stylus" scoped>
.sign-up
  background #7E7D7D
  border-radius 5px
  padding 20px

  &__title
    color inherit
    font-weight bold
    font-size 1.6em
    text-align center
    margin-bottom 25px
    color white
    line-height 1.4

    span
      position relative
      &:after
        position absolute
        left 0
        right 0
        bottom -15px
        content ''
        height 13px
        background url("~assets/images/under-illustration.png")
        background-repeat no-repeat
        background-size contain

  &__form
    display flex
    align-items center
    justify-content center
    margin-bottom 5px

  &__input
    width 280px
    height 40px
    line-height 40px
    border none
    border-radius 5px
    padding-left 10px
    font-size 16px
    outline none
    color inherit

  &__button
    margin-left 10px
    cursor pointer
    text-transform uppercase
    text-decoration none
    padding 0 1em
    border-radius 4px
    border 1px solid #FF5030
    background #FF5030
    color white
    height 40px
    line-height 40px
    display block

    &:hover
      background #FF2E50
      color white

.welcome-back
  background #CECCCC
  border-radius 5px
  padding 20px 30px

  &--premium
    border-bottom-left-radius 0
    border-bottom-right-radius 0

  &__container
    display flex
    flex-direction column
    align-items center

  &__title
    margin-bottom 1px
    font-size 25px
    font-weight bold
    text-align center
    line-height normal
    color #111

  &__subtitle
    font-size 16px
    color #676868
    text-align center
    line-height normal

  &__link
    display flex
    align-items center
    margin 10px
    padding 2px 0
    font-size 15px
    color red
    text-decoration none

    &-image
      display flex
      align-items center
      margin-right 3px

    &-text
      font-size 18px

      .welcome-back__link:hover &
        text-decoration underline

    &s
      margin-top 10px
      display flex
      align-items center
      justify-content center

  &__upgrade
    color #FF3B43
    text-decoration underline
    font-size 16px
    font-weight bold

</style>
