<template>
  <div :class="{ premium: user.premium, 'go-premium': !user.premium }">
    <div
      v-if="user.premium"
      class="premium__container"
    >
      <h3 class="premium__title">
        <div class="premium__title-image">
          <img
            src="~assets/svgs/badge_premium.svg"
            alt="Premium User"
          >
        </div>
        <div class="premium__title-text">
          You are a Premium Member
        </div>
      </h3>

      <div class="premium__stock-ideas">
        <div class="premium__stock-ideas-content">
          This months’ Premium-Exclusive best stock ideas newsletter has been sent and feature
          growing small caps. The stock ideas include :
        </div>
        <div class="premium__stocks">
          <a
            v-for="company in companies"
            :key="company.id"
            class="premium__stock"
            :href="company.url"
          >
            <div class="premium__stock-image">
              <img
                :src="company.logo"
                :title="company.name"
                :alt="company.name"
              >
            </div>
            <div class="premium__stock-symbol">
              {{ company.symbol }}
            </div>
          </a>
        </div>
      </div>

      <div class="premium__divider" />

      <div class="premium__disclaimer">
        Stockchase nor any members of its team are not a registered advisor. This newsletter does
        not contain financial advice or recommendations to buy or sell stocks. Please conduct your
        own research and consult a professional.
      </div>
    </div>

    <div
      v-else
      class="go-premium__container"
    >
      <h2 class="go-premium__title">
        To all our readers in Canada : this month's best stock ideas are out
      </h2>

      <div class="go-premium__content">
        <p>
          The premium-exclusive Best Stock Ideas Newsletter features at least three new stock ideas
          every month and January’s edition is out with a selection of “remora companies” that are
          crushing the market.
          <strong>
            One of our stock ideas we sent last December is already up 23% in just 2 months.
          </strong>
        </p>
        <p>
          As of right now, you could miss out on the best stock ideas because you may not be on the
          list to receive the newsletter. For a limited time, you can get the premium bundle,
          including Best Stock Ideas, Capital Compounders paperback and a LOT more at 55% discount.
          Take a minute to learn more.
        </p>
      </div>

      <a
        href="/premium"
        class="go-premium__link"
      >Click here to learn more!</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'Premium',

  computed: {
    ...mapGetters(['user', 'premiumCompanies']),

    companies() { return _.take(this.premiumCompanies, 3); },
  },
};
</script>

<style lang="stylus" scoped>
.go-premium
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
      line-height normal

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
      background-color #FF5030

.premium
  background #7E7D7D
  border-bottom-left-radius 5px
  border-bottom-right-radius 5px
  padding 20px 30px
  color white

  &__title
    color white
    display flex
    align-items center
    justify-content center
    font-size 16px
    font-weight bold
    margin-top 10px
    margin-bottom 30px

    &-image
      display flex
      margin-right 7px

  &__stock
    margin 0 10px
    padding 2px 0
    display flex
    flex-direction column
    align-items center
    color white
    text-decoration none

    &-image
      width 74px
      height 74px
      border-radius 2px
      background white
      position relative

      img
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        margin auto
        max-width 85%
        max-height 85%
        width auto
        height auto

    &-symbol
      font-weight bold
      margin-top 5px
      text-align center

    &s
      margin-top 50px
      display flex
      align-items flex-start
      justify-content center

    &-ideas
      margin-top 1em
      font-size 16px

      &-content
        margin-bottom 1em
        text-align center
        line-height normal

  &__divider
    border-bottom 1px solid rgba(175,175,175,0.4)
    max-width 50%
    margin 50px auto 0

  &__disclaimer
    font-size 13px
    margin-top 5px
    margin-bottom 1em
    line-height normal
    text-align center

</style>
