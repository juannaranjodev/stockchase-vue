<template>
  <div class="guest">
    <div class="guest__section">
      <div class="guest__section-left">
        <div class="guest__avatar">
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
        <div class="opinions">
          <div class="opinions__header">
            <div class="opinions__timestamp">
              <div class="opinions__day">THU</div>
              <div class="opinions__date"><span>Feb 21</span></div>
            </div>

            <div class="opinions__expert">
              <div class="opinions__expert-name">
                <a href="#">Chris Stuchberry</a>
              </div>
              <div class="opinions__expert-company">
                NORTH AMERICAN - LARGE & GLOBAL EQUITIES
              </div>
            </div>
          </div>
          <market-call-guest-opinion
            v-for="index in 7"
            :key="index"
          />
          <div class="opinions__footer">
            <a
              href="#"
              class="opinions__read-all-link"
            >
              Read all from Larry Berman CFA, CMT, CTA (2)
            </a>
            <a
              href="#"
              class="opinions__read-all-button"
            >
              <span>All Opinions</span>
              <img
                src="~assets/images/arrow-right.png"
                width="25"
              >
            </a>
          </div>
        </div>
      </div>
      <div class="guest__section-right">
        <div class="top-picks">
          <div class="top-picks__header">
            <div class="top-picks__title">Top Picks</div>
            <div class="top-picks__image">
              <img
                src="~assets/svgs/top-pick-star.svg"
                width="20"
                height="20"
              >
            </div>
          </div>
          <market-call-guest-opinion
            v-if="guest.hasTopPicks"
            v-for="index in 3"
            :key="index"
            :is-top-pick="true"
            class="opinion opinion--top-pick"
          />
        </div>

        <div class="discover">
          <a class="discover__image">
            <img src="~assets/images/questrade-best-canadian-brokerage.png">
          </a>
          <div class="discover__content">
            <span class="discover__text">Still trying to choose between Questrade versus another trading app? Look at these RedFlagDeals and Twitter po...</span>
            &nbsp;
            <a
              href="#"
              class="discover__more"
            >read more</a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="guest.hasRating"
      class="guest__section guest__section--rating"
    >
      <div class="guest__section-left">
        left
      </div>
      <div class="guest__section-right" />
    </div>
  </div>
</template>

<script>
import MarketCallGuestOpinion from './MarketCallGuestOpinion.vue'

export default {
  name: 'HomeMarketCallGuest',
  props: {
    guest: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    MarketCallGuestOpinion
  },
}
</script>

<style lang="stylus" scoped>
.guest
  &__section
    border-radius 5px
    border 1px solid #E8E8E8
    display flex
    align-items stretch
    flex-wrap nowrap
    margin-bottom 25px
    min-width 0

    &--rating
      border-radius 0
      border 0

    &-left
      border-right 1px solid #E8E8E8
      display flex
      align-items stretch
      flex 1
      min-width 0

      .guest-section--rating &
        border 1px solid #E8E8E8

    &-right
      width 32%
      flex-shrink 0
      flex-grow 0
      min-width 0
      display flex
      flex-direction column
      align-items stretch

  &__avatar
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
      margin 25px 10px

    img
      width 45px
      max-height 45px
      border-radius 5px
      background-color #EEEBEB

.opinions
  flex 1
  overflow hidden

  &__header, &__footer
    height 75px
    padding 0 15px

  &__header
    display flex
    align-items center
    background-color #F9F6F6
    border-bottom 1px solid #E8E8E8

  &__footer
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

.top-picks
  flex-grow 0
  flex-shrink 0

  &__header
    height 75px
    padding 0 15px
    display flex
    align-items center
    background-color #F9F6F6
    border-bottom 1px solid #E8E8E8
    border-top-right-radius 4px

  &__title
    font-size 18px
    color black

  &__image
    display flex
    margin-left 10px

.discover
  padding 20px
  display flex
  flex-direction column
  justify-content center
  flex 1

  &__image
    display flex

    img
      width 100%
      height 100%

  &__content
    font-weight lighter
    font-size 14px
    margin-top 5px

  &__text
    color black

  &__more
    color red
    text-decoration underline

</style>
