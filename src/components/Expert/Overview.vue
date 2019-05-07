<template>
  <div class="expert-overview">
    <div class="expert-logo">
      <img
        :src="expert.avatar"
        width="100"
        height="100"
      >
      <div class="expert-opinions-badge">
        {{ numTotalOpinions }}
      </div>
    </div>
    <div class="expert-meta">
      <div class="expert-meta__content">
        <div class="expert-meta__left">
          <div class="expert-name">
            {{ expert.name }}
            <a
              v-if="expert.email"
              :href="`mailto:${expert.email}`"
            >@</a>
          </div>

          <div
            v-if="numTotalOpinions"
            class="expert-join-date"
          >
            On Stockchase since : {{ expertJoinDate | formatDate('MMM YYYY') }}
          </div>
          <div
            v-else
            class="expert-join-date"
          >
            NO OPINIONS PUBLISHED YET
          </div>

          <div
            v-if="expert.title"
            class="expert-title"
          >
            {{ expert.title }} at {{ expert.company }}
          </div>
        </div>

        <div class="expert-meta__right">
          <div class="expert-rating">
            <a
              v-if="user.loaded && !user.premium"
              class="expert-rating__reveal"
              href="https://stockchase.com/premium/?utm_medium=Stockchase&utm_source=Internal_Links&utm_content=Premium&utm_campain=Stockchase"
            >
              <span class="expert-rating__reveal-stars">
                <img
                  v-for="index in 3"
                  :key="index"
                  src="~assets/images/star.png"
                  width="20"
                  height="18"
                >
              </span>
              <span>Reveal Expert Performance</span>
            </a>
            <a
              v-if="user.loaded && user.premium"
              class="expert-rating__view"
              :href="`${expert.url}/rating`"
            >
              <span class="expert-rating__view-stars">
                <img
                  v-for="index in 3"
                  :key="index"
                  src="~assets/images/star.png"
                  width="20"
                  height="18"
                >
              </span>
              <span>View Expert Rating Card</span>
            </a>
          </div>
        </div>
      </div>

      <div class="expert-meta__content">
        <div class="expert-message">
          {{ expert.name }} hasn't left any messages.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Overview',

  computed: {
    ...mapGetters(['expert', 'expertJoinDate', 'numTotalOpinions', 'user']),
  },
};
</script>

<style lang="stylus" scoped>
.expert
  &-overview
    display flex
    align-items flex-start

  &-logo
    width 100px
    height 100px
    margin 0 50px 0 0
    display flex
    align-items center
    position relative

    img
      border-radius 12px

  &-opinions-badge
    background-color #E0EFFD
    border 2px solid #C5E7F6
    padding 3px 5px
    border-radius 4px
    color #55638D
    position absolute
    right -8px
    bottom 10px
    text-align center

  &-meta
    flex 1

    &__content
      display flex
      align-items center
      justify-content space-between

    &__right
      margin-left 50px

  &-name
    font-size 18px
    color #25292B
    font-weight bolder
    margin-top 15px

    a
      font-size 24px
      color #6F7980
      margin-left 10px
      text-decoration none

  &-join-date
    color #6F7980
    font-size 14px
    margin-top 2px

  &-title
    color #ABB3B9
    font-size 15px
    margin-top 4px

  &-message
    position relative
    background #E7E5E5
    padding 20px 30px 25px 30px
    border-radius 5px
    margin-top 20px
    flex 1
    color #6F7980

    &:after
      content ''
      position absolute
      top 0
      left 5%
      width 0
      height 0
      border 10px solid transparent
      border-bottom-color #E7E5E5
      border-top 0
      margin-left -10px
      margin-top -10px

  &-rating
    &__view
      display flex
      flex-direction column
      align-items center
      text-decoration none

      &-stars
        display flex
        align-items center
        justify-content center
        margin-bottom 5px

      span
        color red

    &__reveal
      display flex
      flex-direction column
      align-items center
      text-decoration none

      &-stars
        display flex
        align-items center
        justify-content center
        margin-bottom 5px

      span
        color red

</style>
