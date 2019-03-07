<template>
  <div class="opinion">
    <div class="opinion__figure">
      <a
        class="opinion__company-logo"
        href="#">
        <img src="~assets/images/stock-nologo.png">
      </a>
      <div class="opinion__signal">
        <div class="opinion__signal-badge buy buy-border" />
      </div>
    </div>
    <div class="opinion__content">
      <div class="opinion__company">
        <a
          class="opinion__company-name"
          href="#">
          BMO Tactical Dividend BMO Tactical Dividend BMO Tactical Dividend
        </a>
        <a
          v-if="!isTopPick"
          class="opinion__company-symbol"
          href="#">
          <span>[ZZZD-T]</span>
        </a>
        <div
          v-if="!isTopPick"
          class="opinion__save"
        >
          <a href="#">
            <img
              src="~assets/images/add-watchlist.png"
              width="28"
            >
            <span>SAVE</span>
          </a>
        </div>
      </div>
      <div class="opinion__text">
        <a
          class="opinion__text-link"
          href="#">
          What happens when governments stop buying What happens when governments stop buying
        </a>
        <a
          class="opinion__text-more"
          href="#">
          <span>read more</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMarketCallGuestOpinion',
  props: {
    opinion: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    isTopPick: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="stylus" scoped>
.opinion
  height 75px
  padding 0 15px
  border-bottom 1px solid #E8E8E8
  display flex
  align-items center

  &:hover
    background-color #F9F6F6

  &--top-pick
    background-color rgba(254, 62, 71, 0.1) !important

  &__figure
    width 75px
    display flex
    align-items center
    position relative
    flex-grow 0
    flex-shrink 0

  &__signal
    position absolute
    left 35px
    top 50%
    margin-top 2px

    &-badge
      width 22px
      height 22px
      border-radius 22px

  &__content
    flex 1
    overflow hidden

  &__company
    display flex
    align-items center

    &-logo
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

  &__save
    display flex
    align-items center
    justify-content flex-end
    width 70px
    margin-left 5px
    flex-shrink 0

    a
      font-size 14px
      color red
      display none
      align-items center

      img
        margin-right 3px

      .opinion:hover &
        display flex

  &__text
    display flex
    align-items center

    &-link
      font-size: 16px
      color #403F3F
      font-weight 400
      text-overflow ellipsis
      white-space nowrap
      overflow hidden

      *
        font-family inherit !important
        line-height inherit !important
        font-size inherit !important

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

</style>
