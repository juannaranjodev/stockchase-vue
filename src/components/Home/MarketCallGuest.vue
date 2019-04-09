<template>
  <div class="guest">
    <div class="guest__section">
      <div class="guest__section-left">
        <div class="guest__avatar">
          <a :href="guest.expert.url">
            <img
              :src="guest.expert.avatar"
              :title="guest.expert.name"
              width="45"
              height="45"
            >
          </a>
        </div>
        <div class="opinions">
          <div class="opinions__header">
            <div class="opinions__timestamp">
              <div class="opinions__day">
                {{ guest.date | formatDate('ddd') }}
              </div>
              <div class="opinions__date">
                <span>{{ guest.date | formatDate('MMM D') }}</span>
              </div>
            </div>

            <div class="opinions__expert">
              <div class="opinions__expert-name">
                <a :href="guest.expert.url">{{ guest.expert.name }}</a>
              </div>
              <div class="opinions__expert-company">
                {{ guest.subject.name }}
              </div>
            </div>
          </div>
          <market-call-guest-opinion
            v-for="opinion in guest.opinions"
            :key="opinion.id"
            :opinion="opinion"
          />
          <div class="opinions__footer">
            <a
              :href="guest.expert.url"
              class="opinions__read-all-link"
            >
              Read all from {{ guest.expert.name }}
            </a>
            <a
              :href="guest.expert.url"
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
            <div class="top-picks__title">
              Top Picks
            </div>
            <div class="top-picks__image">
              <img
                src="~assets/svgs/top-pick-star.svg"
                width="20"
                height="20"
              >
            </div>
          </div>
          <market-call-guest-opinion
            v-for="opinion in guest.topPicks"
            :key="opinion.id"
            :opinion="opinion"
            :is-top-pick="true"
            class="opinion opinion--top-pick"
          />
        </div>

        <div class="discover">
          <a
            :href="discoverPost.link"
            class="discover__image"
          >
            <img :src="discoverPost.image">
          </a>
          <div class="discover__content">
            <span class="discover__text">{{ discoverPost.excerpt }}</span>
            &nbsp;
            <a
              :href="discoverPost.link"
              class="discover__more"
            >read more</a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="guest.ratings.length"
      class="guest__section guest__section--premium"
    >
      <div class="guest__section-left">
        <div class="premium">
          <div class="premium__badge">
            <div class="premium__label">
              Premium
            </div>
          </div>
          <div class="premium__content">
            <div class="premium__title">
              <a
                class="premium__link premium__link--big"
                :href="user.premium ? ratingUrl : premiumLink"
              >{{ guest.expert.name }}’s Top Picks Portfolio</a>
              <div class="premium__rating">
                <img
                  v-if="!user.premium"
                  src="~assets/images/starts-rate.png"
                  height="27"
                >
                <a
                  v-if="user.premium"
                  class="premium__link"
                  :href="ratingUrl"
                >View Expert Rating</a>
                <a
                  v-else
                  class="premium__link"
                  :href="premiumLink"
                >Reveal Performance</a>
              </div>
            </div>
            <div class="premium__info">
              <div class="premium__figure">
                <a
                  class="premium__company-logo"
                  :href="user.premium ? ratingUrl : premiumLink"
                >
                  <img :src="topPickCompanyLogo">
                </a>
                <div class="premium__company-badge">
                  <img
                    src="~assets/svgs/top-pick-star.svg"
                    width="20"
                    height="20"
                  >
                </div>
              </div>

              <div class="premium__info-item">
                <div class="premium__info-item-label">
                  TOP PICKS
                </div>
                <div class="premium__info-item-content">
                  <div
                    v-if="user.premium"
                    class="premium__info-item-value"
                  >
                    {{ guest.topHorizon.total_tp || '&nbsp;' }}
                  </div>
                  <div
                    v-else
                    class="premium__info-item-value premium__info-item-value--masked"
                  >
                    masked
                  </div>
                </div>
              </div>

              <div class="premium__info-item">
                <div class="premium__info-item-label">
                  BIG WIN
                </div>
                <div class="premium__info-item-content">
                  <div
                    v-if="user.premium"
                    class="premium__info-item-value"
                  >
                    {{ guest.topHorizon.big_win || '&nbsp;' }}
                  </div>
                  <div
                    v-else
                    class="premium__info-item-value premium__info-item-value--masked"
                  >
                    masked
                  </div>
                </div>
              </div>

              <div
                v-if="user.loaded && !user.premium"
                class="premium__signup"
              >
                <div class="premium__signup-title">
                  This is a Premium Subscriber-Only Feature
                </div>
                <a
                  :href="premiumLink"
                  class="premium__signup-button"
                >
                  <span>Sign up for Premium</span>
                </a>
              </div>

              <div class="premium__info-item">
                <div class="premium__info-item-label">
                  HORIZON
                </div>
                <div class="premium__info-item-content">
                  <div
                    v-if="user.premium"
                    class="premium__info-item-value"
                  >
                    {{ guest.topHorizon.period || '&nbsp;' }}
                  </div>
                  <div
                    v-else
                    class="premium__info-item-value premium__info-item-value--masked"
                  >
                    masked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="guest__section-right" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarketCallGuestOpinion from './MarketCallGuestOpinion.vue'

export default {
  name: 'MarketCallGuest',
  components: {
    MarketCallGuestOpinion
  },
  props: {
    guest: {
      type: Object,
      default: () => ({})
    },
    discoverPost: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    ...mapGetters([ 'user' ]),

    premiumLink() {
      return "https://stockchase.com/premium/?utm_medium=Stockchase&utm_source=Internal_Links&utm_content=Premium&utm_campain=Stockchase"
    },

    ratingUrl() {
      return `${this.guest.expert.url}/rating`
    },

    topPickCompanyLogo() {
      return this.guest.topPicks.length
        ? this.guest.topPicks[0].Company.logo
        : 'https://stockchase.com/assets/no_logo.png'
    },
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

    &--premium
      border-radius 0
      border 0

    &-left
      border-right 1px solid #E8E8E8
      display flex
      align-items stretch
      flex 1
      min-width 0

      .guest__section--premium &
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
    justify-content center
    align-items center

    img
      max-width 100%

  &__content
    font-weight lighter
    font-size 14px
    margin-top 5px

  &__text
    color black

  &__more
    color red
    text-decoration underline

.premium
  height 137px
  display flex
  align-items stretch
  flex 1
  min-width 0

  &__badge
    width 68px
    flex-grow 0
    flex-shrink 0
    background-color #EEEBEB
    display flex
    align-items center
    justify-content center

  &__label
    transform rotate(-90deg)
    color #FF3B43
    font-size 18px
    font-weight bold
    text-transform uppercase

  &__content
    flex 1

  &__title
    display flex
    align-items center
    justify-content space-between
    height 55px
    padding 0 15px

  &__rating
    display flex
    align-items center

    img
      margin-right 5px

  &__link
    font-size 14px
    color #FF3B43

    &--big
      font-size 18px
      font-weight bold

  &__figure
    width 75px
    display flex
    align-items center
    position relative
    flex-grow 0
    flex-shrink 0

  &__company
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

    &-badge
      position absolute
      left 35px
      top -10px

  &__info
    padding 10px 15px 0
    display flex
    align-items center

    &-item
      &:not(:last-child)
        margin-right 15px

      &-value
        &--masked
          color transparent
          text-shadow 0 0 10px rgba(0,0,0,0.5)

  &__signup
    width 302px
    height 49px
    border 1px solid red
    text-align center
    border-radius 5px
    margin-right 15px

    &-title
      margin-top 10px
      font-size 13px
      color #717171
      font-weight bold

    &-button
      width 60%
      cursor pointer
      padding 0 15px
      text-align center
      border-radius 4px
      border 1px solid #FF5030
      background #FF5030
      color white !important
      height 29px
      line-height 29px
      display flex
      align-items center
      justify-content center
      margin 5px auto 0

      &:hover
        background #FF2E50
        color white

</style>
