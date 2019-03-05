<template>
  <div class="sign-up">
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
</template>

<script>
export default {
  name: 'HomeSignUp',
  serverCacheKey: () => {
    return `home::sign-up`
  },
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

</style>
