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
        <div class="guest__opinions">
          <div class="guest__opinions-header">
            <div class="guest__opinions-timestamp">
              <div class="guest__opinions-day">THU</div>
              <div class="guest__opinions-date"><span>Feb 21</span></div>
            </div>

            <div class="guest__opinions-expert">
              <div class="guest__opinions-expert-name">
                <a href="#">Chris Stuchberry</a>
              </div>
              <div class="guest__opinions-expert-company">
                NORTH AMERICAN - LARGE & GLOBAL EQUITIES
              </div>
            </div>
          </div>
          <div
            v-for="index in 7"
            :key="index"
            class="guest__opinion"
          >
            <div class="guest__opinion-figure">
              <a
                class="guest__opinion-company-logo"
                href="#">
                <img src="~assets/images/stock-nologo.png">
              </a>
              <div class="guest__opinion-signal">
                <div class="guest__opinion-signal-badge buy buy-border" />
              </div>
            </div>
            <div class="guest__opinion-content">
              <div class="guest__opinion-company">
                <a
                  class="guest__opinion-company-name"
                  href="#">
                  BMO Tactical Dividend BMO Tactical Dividend BMO Tactical Dividend
                </a>
                <a
                  class="guest__opinion-company-symbol"
                  href="#">
                  <span>[ZZZD-T]</span>
                </a>
              </div>
              <div class="guest__opinion-text">
                <a
                  class="guest__opinion-text-link"
                  href="#">
                  What happens when governments stop buying What happens when governments stop buying
                </a>
                <a
                  class="guest__opinion-text-more"
                  href="#">
                  <span>read more</span>
                </a>
              </div>
            </div>
          </div>
          <div class="guest__opinions-footer">
            <a
              href="#"
              class="guest__opinions-read-all-link"
            >
              Read all from Larry Berman CFA, CMT, CTA (2)
            </a>
            <a
              href="#"
              class="guest__opinions-read-all-button"
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
        right
        <br>
        <br>
        <br>
        <br>
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

    &--rating
      border-radius 0
      border 0

    &-left
      border-right 1px solid #E8E8E8
      display flex
      align-items stretch
      width 68%

      .guest-section--rating &
        border 1px solid #E8E8E8

    &-right
      width 32%
      flex-shrink 0
      flex-grow 0

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

  &__opinion
    height 75px
    padding 0 15px
    border-bottom 1px solid #E8E8E8
    display flex
    align-items center

    &:hover
      background-color #F9F6F6

    &-figure
      width 75px
      display flex
      align-items center
      position relative
      flex-grow 0
      flex-shrink 0

    &-company-logo
      width 47px
      height 47px
      border-radius 5px
      border 1px solid #ccc
      background white
      position relative
      display block

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

    &-signal
      position absolute
      left 35px
      top 50%
      margin-top 2px

      &-badge
        width 22px
        height 22px
        border-radius 22px

    &-content
      flex 1
      overflow hidden

    &-company
      margin-right 70px
      display flex
      align-items center

      &-name
        color black
        font-size 22px
        font-weight bold
        text-transform uppercase
        text-overflow ellipsis
        white-space nowrap
        overflow hidden

      &-symbol
        color #ADB2C1
        font-weight bold
        margin-left 5px
        white-space nowrap
        flex-shrink 0

        span
          font-size 18px

    &-text
      display flex
      align-items center

      &-link
        font-size: 16px
        color #403F3F
        font-weight 400
        text-overflow ellipsis
        white-space nowrap
        overflow hidden

        .guest__opinion:hover &
          background-color rgb(216, 216, 216)
          text-decoration underline

      &-more
        font-size 16px
        color red
        margin-left 5px
        white-space nowrap
        flex-shrink 0

        span
          font-size 14px

    &s
      flex 1
      overflow hidden

      &-header, &-footer
        height 75px
        padding 0 15px

      &-header
        display flex
        align-items center
        background-color #F9F6F6
        border-bottom 1px solid #E8E8E8

      &-footer
        display flex
        align-items center
        justify-content space-between

        &:hover
          background-color #F9F6F6

      &-timestamp
        width 75px
        flex-grow 0
        flex-shrink 0
        font-size 18px
        font-weight bold
        color black

      &-day
        text-transform uppercase
        letter-spacing 6px

      &-date
        span
          font-size 14px

      &-expert
        flex 1
        font-size 18px
        color black

        &-name
          a
            color inherit
            font-weight bold

      &-read-all
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


</style>
