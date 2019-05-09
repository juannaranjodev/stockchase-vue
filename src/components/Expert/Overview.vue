<template>
  <div class="expert-overview">
    <div class="expert-overview__content">
      <div class="expert-logo">
        <img
          :src="expert.avatar"
          width="70"
          height="70"
        >
      </div>
      <div class="expert-meta">
        <div class="expert-meta__content">
          <div class="expert-meta__left">
            <div class="expert-name">
              {{ expert.name }}
            </div>

            <div
              v-if="numTotalOpinions"
              class="expert-join-date"
            >
              Member since: {{ expertJoinDate | formatDate('MMM [\']YY') }}
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
              {{ expert.title }} at
              <br>
              {{ expert.company }}
            </div>
          </div>

          <div class="expert-meta__right">
            <a
              class="review-expert"
              href="#"
              @click="showComments"
            >
              <img
                src="~assets/svgs/star.svg"
                width="13"
              >
              <span>Review</span>
            </a>
          </div>
        </div>

        <div class="expert-meta__footer">
          <a
            v-if="user.loaded && user.premium"
            class="expert-rating expert-rating--premium"
            :href="`${expert.url}/rating`"
          >
            <expert-rating
              :rating="expert.rating"
              :total-wins="expert.totalWins"
              :total-loses="expert.totalLoses"
            />
          </a>
          <a
            v-if="user.loaded && !user.premium"
            class="expert-rating"
            href="https://stockchase.com/premium/?utm_medium=Stockchase&utm_source=Internal_Links&utm_content=Premium&utm_campain=Stockchase"
          >
            <img
              src="~assets/svgs/rating.svg"
              width="17"
            >
            <span>Reveal Expert Rating</span>
          </a>
          <div class="expert-opinions">
            {{ numTotalOpinions }} Opinions
          </div>
        </div>
      </div>
    </div>
    <div class="expert-overview">
      <a
        v-if="user.loaded && user.premium"
        :href="`${expert.url}/rating`"
        class="expert-rating-card"
      >
        View {{ expert.first_name }}'s Rating Card
      </a>
      <a
        v-if="user.loaded && !user.premium"
        href="https://stockchase.com/premium/?utm_medium=Stockchase&utm_source=Internal_Links&utm_content=Premium&utm_campain=Stockchase"
        class="expert-rating-card"
      >
        Unlock {{ expert.first_name }}'s Rating Card
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExpertRating from '../ExpertRating.vue';

export default {
  name: 'Overview',

  components: { ExpertRating },

  computed: {
    ...mapGetters(['expert', 'expertJoinDate', 'numTotalOpinions', 'user']),
  },

  methods: {
    showComments(e) {
      e.preventDefault();

      this.$bus.$emit('showExpertComments');
    },
  },
};
</script>

<style lang="stylus" scoped>
.expert
  &-overview
    &__content
      display flex
      align-items flex-start

  &-logo
    width 70px
    height 70px
    margin 0 20px 0 0
    display flex
    align-items center
    border-radius 70px
    box-shadow 0 2px 4px rgba(black, 0.5)

    img
      border-radius 70px
      box-shadow 0 10px 21px rgba(black, 0.11)

  &-opinions
    background-color #DFEFFD
    border 2px solid #C5E7F6
    padding 0 5px
    border-radius 3px
    color #55638D
    font-size 14px
    font-weight bold
    text-align center
    margin-left 10px
    display flex
    align-items center
    height 27px

  &-meta
    flex 1

    &__content
      display flex
      align-items flex-start
      justify-content space-between

    &__footer
      display flex
      align-items center
      margin-top 15px

    &__left
      flex 1

    &__right
      margin-left 10px

  &-name
    font-size 18px
    color #25292B
    font-weight bold
    line-height 22px

  &-join-date
    color #7f7f7f
    font-size 14px
    line-height 17px
    font-weight bold
    margin-top 4px

  &-title
    color #a6a6a6
    font-size 15px
    line-height 18px
    margin-top 5px

  &-rating-card
    background #F5F6F7
    border 1px solid #EEEEEE
    padding 9px 5px
    border-radius 4px
    margin-top 30px
    color #999ea3
    font-size 12px
    font-weight bold
    line-height 15px
    text-align center
    height 33px
    display block

  &-rating
    display flex
    align-items center
    text-decoration none
    height 27px
    border-radius 27px
    background-color #fff1dc
    color #A46912
    font-size 14px
    font-weight bold
    padding 0 5px

    &--premium
      background-color transparent
      padding 0

    span
      margin 0 8px

.review-expert
  color white
  text-decoration none
  background-color #FF5030
  display flex
  align-items center
  text-align center
  border-radius 4px
  height 40px
  padding 0 15px
  font-size 15px
  font-weight bold
  line-height normal

  img
    margin-right 8px

  &:hover
    background-color #FF2E50

@media (max-width 767px)
  .expert
    &-meta
      &__content
        display block

      &__right
        margin-left 0
        margin-top 20px

      &__footer
        display block


    &-opinions
      margin-left 0
      margin-top 20px

</style>
