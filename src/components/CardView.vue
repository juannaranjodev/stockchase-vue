<template>
  <div class="card-view">
    <div class="card-info">
      <a :href="cardLink">
        <div :class="`card-picture ${imageSize}`">
          <img
            :src="imageSrc"
          >
        </div>
        <h6>
          <span
            v-for="(word, index) in titleWords"
            :key="index"
            :class="{ highlighted: word.highlighted }"
          >
            {{ word.text }}
          </span>
        </h6>
        <p>{{ subTitle }}</p>
      </a>
      <ul
        v-if="socialLinks"
        class="card-social-links"
      >
        <li :class="{ 'has-link': socialLinks && socialLinks.twitter }">
          <a :href="twitterUrl"><i class="icon icon-twitter" /></a>
        </li>
        <li :class="{ 'has-link': socialLinks && socialLinks.linkedin }">
          <a :href="linkedInUrl"><i class="icon icon-linkedin" /></a>
        </li>
        <li :class="{ 'has-link': socialLinks && socialLinks.facebook }">
          <a :href="facebookUrl"><i class="icon icon-facebook" /></a>
        </li>
      </ul>
      <a
        v-if="user.premium && ratingEnabled"
        class="card-rating-link"
        :href="`${cardLink}/rating`"
      >
        <expert-rating
          :rating="rating"
          :total-loses="totalLoses"
          :total-wins="totalWins"
        />
      </a>
    </div>
    <a :href="cardLink">
      <div class="card-footnote">
        {{ footnote }}
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExpertRating from './ExpertRating';

export default {
  name: 'CardView',

  components: { ExpertRating },

  props: {
    imageSrc: {
      type: String,
      default: '/assets/svgs/expert_profile_default.svg',
    },
    imageSize: {
      type: String,
      default: 'small',
    },
    title: {
      type: String,
      default: '`title` here',
    },
    subTitle: {
      type: String,
      default: '`sub-title` here',
    },
    footnote: {
      type: String,
      default: '`footnote` here',
    },
    socialLinks: {
      type: Object,
      default: () => null,
    },
    cardLink: {
      type: String,
      default: '',
    },
    ratingEnabled: {
      type: Boolean,
    },
    rating: {
      type: Number,
      default: null,
    },
    totalWins: {
      type: Number,
      default: null,
    },
    totalLoses: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapGetters(['user']),

    searchQuery() {
      return this.$route.query.search;
    },

    titleWords() {
      return this.title.split(/\s+/).map(text => ({
        text,
        highlighted: this.searchQuery && text.search(new RegExp(this.searchQuery, 'i')) > -1,
      }));
    },

    twitterUrl() {
      return (this.socialLinks && this.socialLinks.twitter) || '';
    },
    linkedInUrl() {
      return (this.socialLinks && this.socialLinks.linkedin) || '';
    },
    facebookUrl() {
      return (this.socialLinks && this.socialLinks.facebook) || '';
    },
  },
};
</script>

<style lang="stylus">
.card
  &-info
    position: relative
    min-height 290px
    padding 10px
    text-align center
    a:hover
      text-decoration none

  &-social-links
    padding 0
    list-style none
    text-align center
    position relative
    li
      display inline-block
      vertical-align middle
      margin 0 6px
      a
        text-decoration none
        display inline-block
        pointer-events none
        opacity 0.1
    li.has-link
      a
        pointer-events initial
        opacity 1
  &-view
    border 1px solid #E9E9EA
    display inline-block
    font-size initial
    vertical-align top
    width 100%

    h6
      font-size 15px
      text-transform uppercase
      color #25325A
      font-weight normal
      word-wrap break-word
      line-height 1.2
      overflow hidden
      text-overflow -o-ellipsis-lastline
      text-overflow ellipsis
      /* autoprefixer: off */
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      max-height 2.4em

      span.highlighted
        background-color #fff3d3

    p
      color #8990A5
      font-size 13px
      font-weight normal
      margin-bottom 13px
    > a:hover
      text-decoration none
  &-picture
    width 64px
    height 64px
    margin auto
    border 1px solid #E1E1E1
    background-color #F7F7F7
    border-radius 4px
    overflow hidden
    margin-bottom 21px
    margin-top 14px
    text-align center
    position relative
    img
      max-width 100%
      max-height 100%
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      margin auto
  &-picture.large
    width 94px
    height 94px
    img
      max-width calc(100% - 20px)
  &-footnote
    display block
    width 100%
    text-align center
    text-transform uppercase
    padding 14px 10px
    color #6F7980
    font-size 12px
    background-color #F7F7F7
    border-top 1px solid #E9E9EA
    box-sizing border-box
    text-decoration none
    font-weight bold
  &-view:hover &-footnote
    background-color #DDD
  &-rating-link
    position absolute
    bottom 15px
    left 0
    width 100%
    display flex
    align-items center
    justify-content center

.icon
  width 20px
  height 20px
  display block
  &:after
    content ''
    width 100%
    height 100%
    background-position center
    background-size contain
    background-repeat no-repeat
    display block
  &-twitter:after
    background-image url('~assets/svgs/social-twitter.svg')
  &-linkedin:after
    background-image url('~assets/svgs/social-linkedin.svg')
  &-facebook:after
    background-image url('~assets/svgs/social-facebook.svg')

</style>
