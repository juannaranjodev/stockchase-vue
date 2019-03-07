<template>
  <div class="market-outlook">
    <h1 class="market-outlook__title">Today's Market Outlook</h1>
    <div class="market-outlook__subtitle">
      <a href="/opinions/market">Read all answers</a>
    </div>

    <div class="market-outlook__section">
      <div class="market-outlook__section-left">
        <div class="market-outlook__avatar">
          <a href="#">
            <img
              src="~assets/images/berman-larry.png"
              alt="Larry Berman CFA, CMT, CTA"
              title="Larry Berman CFA, CMT, CTA"
              width="45"
              height="45"
            >
          </a>
        </div>
        <div class="comments">
          <div class="comments__header">
            <div class="comments__timestamp">
              <div class="comments__day">THU</div>
              <div class="comments__date"><span>Feb 21</span></div>
            </div>

            <div class="comments__expert">
              <div class="comments__expert-name">
                <a href="#">Chris Stuchberry</a>
              </div>
              <div class="comments__expert-company">&nbsp;</div>
            </div>
          </div>

          <div class="market-comment">
            <div class="market-comment__content">
              <span style="color: #ff0000;"><strong>Market.  </strong></span> Guest Sid Mokhtari of CIBC world markets guest hosted the show in Larry's absence.  Where it stands today, risk rewards are not that great.  You are close to your 200 day moving average.  The energy sector is still a relative laggard from a relative strength perspective and that is an issue for him.  Expect volatility to persist.  The message from last year's Q4 is that volatility will be with us for a while longer.  In Canada we saw last year better technical characteristics in the resource sector, except energy.  Larger caps are still the way to go in the Canadian resource sector.
            </div>
          </div>

          <div class="comments__footer">
            <a
              href="#"
              class="comments__read-all-link"
            >
              More market comments
            </a>
            <a
              href="#"
              class="comments__read-all-button"
            >
              <span>Market Comments</span>
              <img
                src="~assets/images/arrow-right.png"
                width="25"
              >
            </a>
          </div>
        </div>
      </div>
      <div class="market-outlook__section-right">
        <a
          href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Sponsor_Link_BottomHP&utm_term=Free%20Portfolio%20and%20Stock%20Tracker"
          class="try-wealthica"
        >Try Wealthica : Free Portfolio and Stock Tracker</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeMarketOutlook',
  serverCacheKey: () => {
    return `home::market-outlook`
  },
}
</script>

<style lang="stylus" scoped>
.market-outlook
  padding 20px 0

  &__title
    font-size 1.7em
    margin-bottom 5px
    font-weight bold
    text-transform uppercase
    text-align center

  &__subtitle
    text-align center
    a
      color #FF2E50
      text-decoration underline

  &__section
    border-radius 5px
    border 1px solid #E8E8E8
    display flex
    align-items stretch
    flex-wrap nowrap
    margin 20px 0
    min-width 0

    &-left
      display flex
      align-items stretch
      flex 1
      min-width 0

      &:not(:only-child)
        border-right 1px solid #E8E8E8

    &-right
      width 32%
      flex-shrink 0
      flex-grow 0
      min-width 0
      display flex
      flex-direction column
      align-items stretch
      justify-content center

  &__avatar
    width 68px
    flex-grow 0
    flex-shrink 0
    border-top-left-radius 4px
    border-bottom-left-radius 4px
    background-color #EEEBEB
    display flex
    align-items flex-start
    justify-content center

    a
      display flex
      width 45px
      height 45px
      margin 25px 0

    img
      width 45px
      max-height 45px
      border-radius 5px
      background-color #EEEBEB

.comments
  flex 1
  overflow hidden

  &__header, &__footer
    padding 0 15px

  &__header
    height 75px
    display flex
    align-items center
    background-color #F9F6F6
    border-bottom 1px solid #E8E8E8

  &__footer
    height 58px
    display flex
    align-items center
    justify-content space-between

    &:hover
      background-color #F9F6F6

  &__timestamp
    width 75px
    flex-grow 0
    flex-shrink 0
    font-size 18px
    font-weight bold
    color black

  &__day
    text-transform uppercase
    letter-spacing 6px

  &__date
    span
      font-size 14px

  &__expert
    flex 1
    font-size 18px
    color black

    &-name
      a
        color inherit
        font-weight bold

  &__read-all
    &-link
      font-size 16px
      font-weight bolder
      text-decoration underline
      color black

    &-button
      margin-left 10px
      cursor pointer
      padding 0 15px
      border-radius 35px
      border 1px solid #FF5030
      background #FF5030
      color white !important
      height 35px
      line-height 35px
      display flex
      align-items center

      span
        margin-right 10px

      &:hover
        background #FF2E50
        color white

.market-comment
  padding 15px
  border-bottom 1px solid #E8E8E8
  display flex
  align-items center

  &:hover
    background-color #F9F6F6

  &__content
    font-size 18px
    line-height 1.8
    color black

    *
      font-family inherit !important
      line-height inherit !important
      font-size inherit !important

.try-wealthica
  display block
  margin 20px
  padding 15px
  box-shadow 0px 1px 1px rgba(255,255,255,0.35) inset, 0px 1px 1px rgba(0,0,0,0.3)
  border 1px solid #ff5030
  border-radius 30px
  text-decoration none
  color #ff5030
  font-weight normal
  font-family arial,sans-serif
  font-size 16px
  background-color #f1f1f1
  line-height 1.2
  text-align center

</style>
