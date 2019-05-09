<template>
  <div class="expert-top-picks">
    <h3 class="expert-top-picks__title">
      Latest Top Picks
    </h3>
    <div class="expert-top-picks__list">
      <div
        v-for="opinion in expertTopPicks"
        :key="`toppick_${opinion.id}`"
        class="expert-top-picks__item"
      >
        <div class="opinion">
          <div class="opinion__figure">
            <a
              class="opinion__company-logo"
              :href="opinion.Company.url"
            >
              <img :src="opinion.Company.logo">
            </a>
            <div class="opinion__badge">
              <img
                src="~assets/svgs/top-pick-star.svg"
                width="20"
                height="20"
              >
            </div>
          </div>
          <div class="opinion__content">
            <div class="opinion__company">
              <a
                class="opinion__company-symbol"
                :href="opinion.Company.url"
              >
                {{ opinion.Company.symbol }}
              </a>
            </div>
            <div class="opinion__text">
              {{ opinion.comment | stripTags }}
            </div>
          </div>
        </div>
      </div>
      <div class="expert-top-picks__item">
        <div class="top-picks-portfolio">
          <img
            v-if="user.loaded && !user.premium"
            src="~assets/svgs/lock_opened.svg"
            width="23"
          >
          <a
            v-if="user.loaded && user.premium"
            :href="`${expert.url}/rating`"
          >
            View {{ expert.first_name }}'s
            <br>
            Top Picks portfolio
          </a>
          <a
            v-if="user.loaded && !user.premium"
            href="https://stockchase.com/premium/?utm_medium=Stockchase&utm_source=Internal_Links&utm_content=Premium&utm_campain=Stockchase"
          >
            Unlock {{ expert.first_name }}'s
            <br>
            Top Picks portfolio
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TopPicks',

  computed: {
    ...mapGetters(['user', 'expert', 'expertTopPicks']),
  },
};
</script>

<style lang="stylus" scoped>
.expert-top-picks
  h3&__title
    color #25292B
    font-size 18px
    line-height 22px
    font-weight bold
    margin-bottom 0

  &__list
    display flex
    align-items flex-start
    flex-wrap wrap

  &__item
    margin-top 25px
    width calc((100% - 2*30px)/3)

    &:nth-child(3n+1), &:nth-child(3n+2)
      margin-right 30px

.top-picks-portfolio
  display flex
  align-items center
  padding 0 5px
  background-color #F6F6F6
  border 1px solid #E7E6E6
  border-radius 5px
  justify-content center
  height 56px

  img
    margin-right 10px

  a
    color #FF4135
    font-size 14px
    text-decoration none
    font-weight bolder
    text-align center

    &:hover
      color #FF2E50

.opinion
  display flex
  align-items center

  &__figure
    width 56px
    margin-right 10px
    display flex
    align-items center
    position relative
    flex-grow 0
    flex-shrink 0

  &__badge
    position absolute
    right -10px
    top -10px

  &__content
    flex 1
    overflow hidden

  &__company
    display flex
    align-items center

    &-logo
      width 56px
      height 56px
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

    &-symbol
      color #06c
      font-weight bold
      white-space nowrap
      flex-shrink 0
      text-decoration none

      span
        font-size 18px

  &__text
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    font-size 15px
    font-weight lighter
    line-height 25px

@media (max-width 767px)
  .expert-top-picks
    &__list
      display flex
      align-items flex-start
      flex-wrap wrap

    &__item
      margin-top 25px
      width 100%
      margin-right 0 !important
</style>
