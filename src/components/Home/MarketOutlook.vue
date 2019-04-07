<template>
  <div class="market-outlook">
    <h1 class="market-outlook__title">
      Today's Market Outlook
    </h1>
    <div class="market-outlook__subtitle">
      <a href="/opinions/market">Read all answers</a>
    </div>

    <div class="market-outlook__section">
      <div class="market-outlook__section-left">
        <div class="market-outlook__avatar">
          <a :href="latestComment.Expert.url">
            <img
              :src="latestComment.Expert.avatar"
              :title="latestComment.Expert.name"
              width="45"
              height="45"
            >
          </a>
        </div>
        <div class="comments">
          <div class="comments__header">
            <div class="comments__timestamp">
              <div class="comments__day">
                {{ latestComment.date | formatDate('ddd') }}
              </div>
              <div class="comments__date">
                <span>{{ latestComment.date | formatDate('MMM D') }}</span>
              </div>
            </div>

            <div class="comments__expert">
              <div class="comments__expert-name">
                <a :href="latestComment.Expert.url">
                  {{ latestComment.Expert.name }}
                </a>
              </div>
              <div class="comments__expert-company">
&nbsp;
              </div>
            </div>
          </div>

          <div class="market-comment">
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="market-comment__content"
              v-html="latestComment.comment"
            />
            <!-- eslint-enable vue/no-v-html -->
          </div>

          <div class="comments__footer">
            <a
              href="/opinions/market"
              class="comments__read-all-link"
            >
              More market comments
            </a>
            <a
              href="/opinions/market"
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
      <div
        v-if="shouldShowAd"
        class="market-outlook__section-right"
      >
        <a
          href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Sponsor_Link_BottomHP&utm_term=Free%20Portfolio%20and%20Stock%20Tracker"
          class="try-wealthica"
        >Try Wealthica : Free Portfolio and Stock Tracker</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MarketOutlook',

  computed: {
    ...mapGetters([ 'latestComment', 'shouldShowAd' ]),
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
      overflow hidden

.comments
  flex 1
  overflow hidden

  .market-outlook__section-left:only-child &
    border-top-right-radius 4px

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
