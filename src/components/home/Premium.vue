<template>
  <div class="premium">
    <h2 class="premium__title">
      To all our readers in Canada : this month's best stock ideas are out
    </h2>

    <div class="premium__content">
      <p>The premium-exclusive Best Stock Ideas Newsletter features at least three new stock ideas every month and January’s edition is out with a selection of “remora companies” that are crushing the market. <strong>One of our stock ideas we sent last December is already up 23% in just 2 months.</strong></p>
      <p>As of right now, you could miss out on the best stock ideas because you may not be on the list to receive the newsletter. For a limited time, you can get the premium bundle, including Best Stock Ideas, Capital Compounders paperback and a LOT more at 55% discount. Take a minute to learn more.</p>
    </div>

    <a
      href="/premium"
      class="premium__link"
    >Click here to learn more!</a>
  </div>
</template>

<script>
export default {
  name: 'HomePremium',
  serverCacheKey: () => {
    return `home::premium`
  },
}
</script>

<style lang="stylus" scoped>
.premium
  background #7E7D7D
  border-radius 5px
  padding 20px 30px
  color white

  &__title
    color inherit
    font-weight bold
    font-size 24px
    text-align center
    margin-bottom 0.75em

  &__content
    p
      font-size 16.5px
      letter-spacing 0.3px

  &__link
    color white
    text-transform uppercase
    background-color #EC4D4B
    display block
    text-align center
    border-radius 5px
    padding 15px
    font-weight bold
    font-size 16px
    letter-spacing 1px

    &:hover
      background-color: #FF5030;


</style>
