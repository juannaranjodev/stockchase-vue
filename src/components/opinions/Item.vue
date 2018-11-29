<template>
  <tr
    class="opinions-row"
    :id="item.id"
    :class="{'opinions-row--ad d-none d-md-table-row': item.ad}">
    <td
      class="signal-cell"
      v-if="!item.ad">
      <div :class="`signal-wrapper ${signalClassName} ${signalClassName}-border-cell d-none d-md-table-cell`">
        <div class="signal-badge">
          <div
            :class="`${signalClassName}-border`">
            {{ item.Signal.name | formatSignalName }}
          </div>
        </div>
      </div>
      <div class="opinion-mini d-md-none">
        <div class="opinion-mini__left">
          <a
            class="opinion-mini__logo"
            :href="item.Company.url">
            <img :src="item.Company.logo">
          </a>
          <div class="opinion-mini__signal">
            <div :class="`opinion-mini__signal-wrapper ${signalClassName} ${signalClassName}-border-cell`">
              <div class="opinion-mini__signal-badge">
                <div
                  :class="`${signalClassName}-border`">
                  {{ item.Signal.name | formatSignalName }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="opinion-mini__right">
          <div class="opinion-mini__header">
            <a
              class="opinion-mini__name-symbol"
              :href="item.Company.url">
              <span class="opinion-mini__name">{{ isOpinion ? item.Company.name : 'General Market Comment' }}</span>
              <span
                class="opinion-mini__symbol"
                v-if="isOpinion">({{ item.Company.symbol }})</span>
            </a>
            <a
              :class="{'opinion-mini__toggle': true, active: expanded}"
              @click="toggleContent"
            >
              <img
                src="~assets/svgs/arrow_down.svg"
                width="12"
              >
            </a>
          </div>

          <div class="opinion-mini__date">
            {{ item.date | formatDate }}
          </div>
          <div
            class="opinion-mini__comment"
            @click="toggleContent"
            v-html="item.comment"/>
        </div>
      </div>
    </td>

    <td
      :class="{'opinion-cell': true, 'd-none d-md-table-cell': !expanded}"
      v-if="!item.ad">
      <div class="opinion">
        <div class="opinion-main">
          <div class="company d-none d-md-flex">
            <a
              class="company-logo"
              :href="item.Company.url">
              <img :src="item.Company.logo">
            </a>
            <div class="company-meta">
              <a
                class="company-name-symbol"
                :href="item.Company.url">
                <span class="company-name">{{ isOpinion ? item.Company.name : 'General Market Comment' }}</span>
                <span
                  class="company-symbol"
                  v-if="isOpinion">({{ item.Company.symbol }})</span>
              </a>
              <div class="opinion-date">
                {{ item.date | formatDate }}
              </div>
            </div>
            <div class="company-share">
              <social-sharing
                :title="sharingContent"
                :hashtags="sharingHashtag"
                :url="item.url"
                inline-template
              >
                <network network="twitter">
                  <span class="btn-share">
                    <img src="~assets/svgs/share.svg">
                  </span>
                </network>
              </social-sharing>
            </div>
          </div>
          <div
            class="opinion-comment"
            v-html="item.comment"/>
        </div>
        <div class="opinion-footer">
          <div class="opinion-footer-left">
            <div
              v-if="isOpinion && item.Company.Sector.name !== '0'"
              class="opinion-sector-badge">{{ item.Company.Sector.name }}</div>
          </div>
          <div class="opinion-footer-right">
            <div style="display: none">
              <div ref="reactionsTooltip">
                <user-reactions :item="item" />
              </div>
            </div>

            <div
              ref="userReactions"
              :class="{ 'opinion-rating': true, 'no-rating': !myRating }"
              @click="showComments">
              <img
                v-if="!myRating"
                src="~assets/images/smileys/smiley-glasses.png"
                width="25">
              <img
                v-if="myRating"
                :src="myRatingImage"
                width="35">
              <span v-if="myRating" >You, and {{ numSameRatings }} Others</span>
            </div>

            <a
              class="btn-comment"
              @click="showComments">
              <img src="~assets/svgs/comment_icon.svg">
              <span
                class="disqus-comment-count"
                :data-disqus-identifier="disqusIdentifier">0 Comments</span>
            </a>
          </div>
        </div>
      </div>
    </td>

    <td
      :class="{'expert-cell': true, 'd-none d-md-table-cell': !expanded}"
      v-if="!item.ad">
      <a
        :href="item.Expert.url"
        class="expert-name">
        {{ item.Expert.name }}
      </a>
      <div class="expert-title">
        {{ item.Expert.title }}
      </div>

      <div
        class="expert-meta"
        v-if="isOpinion">
        <div
          v-b-tooltip.hover
          title="Price">
          <img
            src="~assets/images/price_icon@2x.png"
            width="18"
            alt="Price">
        </div>
        <div>
          ${{ item.price }}
        </div>
      </div>
      <div
        class="expert-meta"
        v-if="isOpinion">
        <div
          v-b-tooltip.hover
          title="Owned">
          <img
            src="~assets/images/owned_icon@2x.png"
            width="18"
            alt="Owned">
        </div>
        <div>
          {{ item.Ownership.name }}
        </div>
      </div>
    </td>

    <td
      colspan="3"
      class="in-feed-ad-cell"
      v-if="item.ad">
      <opinions-in-feed-ad />
    </td>
  </tr>
</template>

<script>
import { timeAgo } from '../../util/filters'
import { getRatingImage } from '../../util/rating'
import UserReactions from './UserReactions.vue'
import OpinionsInFeedAd from './InFeedAd.vue'
import _ from 'lodash'
import md5 from 'md5'

let tippy
if (process.browser) {
  tippy = require('tippy.js').default
}

export default {
  name: 'OpinionsItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
  },

  data () {
    return {
      expanded: false
    }
  },

  components: {
    UserReactions,
    OpinionsInFeedAd,
  },

  computed: {
    isOpinion() {
      return this.item.Company.id !== 1970
    },

    signalClassName() {
      return this.toClassName(this.item.Signal.name)
    },

    disqusIdentifier() {
      return md5(this.item.url)
    },

    myRating() {
      const ratings = this.item.SocialRatings || []
      if (!ratings.length) return

      return _.find(ratings, { user_id: this.$store.getters.user.id })
    },

    myRatingImage() {
      return getRatingImage(this.myRating.rating)
    },

    numSameRatings() {
      const myRating = this.myRating
      if (!myRating) return

      const ratings = this.item.SocialRatings || []
      return _.countBy(ratings, 'rating')[myRating.rating] - 1
    },

    sharingContent() {
      // TODO this is an overly-simplified implementation of the old one from
      // the v1 CI code. Find a way to better compose the share content
      const hashTagLength = this.sharingHashtag.length + 1
      const companyName = this.item.Company.name
      const remainingLength = 134 - (companyName.length + hashTagLength + 2) - 3

      const content = _.trim(this.item.comment.replace(/<(?:.|\n)*?>/gm, '').replace(/\s+/gm, ' ')).substring(0, remainingLength)

      return `${content}... ${companyName}`
    },

    sharingHashtag() {
      return `financial $${this.item.Company.symbol}`
    }
  },

  watch: {
    myRating(rating) {
      this.resetTippy()
    }
  },

  methods: {
    showComments() {
      this.$emit('showComments', this.item.id)
    },

    toClassName(signal) {
      return _.snakeCase(signal)
    },

    initTippy() {
      tippy(this.$refs.userReactions, {
        content: this.$refs.reactionsTooltip,
        interactive: true,
        theme: 'stockchase',
        animateFill: false,
        distance: 5
      })
    },

    destroyTippy() {
      if (this.$refs.userReactions && this.$refs.userReactions._tippy) {
        this.$refs.userReactions._tippy.destroy()
      }
    },

    resetTippy() {
      this.destroyTippy()
      this.initTippy()
    },

    toggleContent() {
      this.expanded = !this.expanded
    }
  },

  mounted() {
    this.initTippy()
  },

  beforeDestroy() {
    this.destroyTippy()
  },

  filters: {
    toClassName (signal) {
      return this.toClassName(signal)
    }
  }
}
</script>

<style lang="stylus">
.tippy-popper
  max-width 700px
.tippy-tooltip
  max-width 700px
  &.stockchase-theme
    padding 12px 12px 12px 15px
    margin 0 0 15px 0
    background white
    border-radius 40px
    font-size 16px
    border 2px solid #dbdbdb
    box-shadow 0px 0px 5px 0px rgba(0,0,0,0.15)
    .tippy-backdrop
      padding 12px 12px 12px 15px
      margin 0 0 15px 0
      background white
      border-radius 40px
      font-size 16px
      border 2px solid #dbdbdb
      box-shadow 0px 0px 5px 0px rgba(0,0,0,0.15)

.opinions-row
  &--ad
    background-color transparent !important
  td
    border 1px solid #ccc
    padding 10px
    text-align left
    background #fcfcfc
    height 230px

  &:hover td
    background #FFFAF1

  .signal
    &-cell
      text-align center
      position relative
      padding 0
      width 80px
    &-wrapper
      width 100%
      min-height 50px
      padding 0
      text-align center
      font-size 10px
      position absolute
      top 0
      height 100%
    &-badge
      padding 5px
      position relative
      top 50%
      transform translateY(-45%)

      & > div
        border-radius 5px
        padding-left 3px
        padding-right 3px
        text-transform uppercase

  .expert
    &-cell
      vertical-align top
      position relative
      padding-top 10px
      width 170px
    &-name
      color #4366D0
      font-size 16px
      font-weight normal
      text-decoration none
    &-title
      margin-bottom 10px
      font-size 14px
      font-weight normal
      line-height 1.4
      color #ABB3B9
    &-meta
      display flex
      align-items center
      flex-wrap wrap
      img
        margin-right 3px
        margin-top -2px

  .company
    display flex
    align-items center
    flex-wrap wrap

    &-logo
      width 74px
      height 74px
      border-radius 5px
      margin 0 10px 0 0
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

    &-meta
      flex 1
      margin-right 10px

    &-name-symbol
      font-size 21px
      font-weight bold
      text-decoration none
      color #000

      &:hover
        color #09f

    &-name
      color inherit
    &-symbol
      color #ABB3B9
      margin-left 3px
      white-space nowrap

  .opinion
    display flex
    flex-direction column
    align-items stretch
    justify-content space-between
    flex-wrap wrap
    height 100%
    &-cell
      position relative
    &-date
      color #ABB3B9
      font-size 16px
    &-comment
      margin-top 5px
      margin-bottom 20px
    &-footer
      display flex
      align-items center
      flex-wrap wrap
      justify-content space-between
      &-left, &-right
        display flex
        align-items center
        flex-wrap wrap
        margin-top 10px
    &-sector-badge
      background-color #E0EFFD
      border 1px solid #C5E7F6
      color #55638D
      padding 5px 10px 5px 10px
      font-size 13px
      font-weight bold
      border-radius 5px
      text-transform uppercase
      line-height 1.4
    &-rating
      margin-right 30px
      color #06c
      display flex
      align-items center

      &.no-rating
        opacity 0.6
      &:hover
        cursor pointer
        opacity 1
        color #09f

      span
        margin-left 10px

  .btn-share
    &:hover
      cursor pointer
    img
      width 65px
  .btn-comment
    display inline-flex
    align-items center
    color #06c !important
    text-decoration none
    &:hover
      cursor pointer
      color #09f !important
    img
      margin-top 5px
      margin-right 3px

.in-feed-ad-cell
  height auto !important
  background-color transparent !important
  border 0 !important
  padding 0 !important

.opinion-mini
  display flex
  align-items stretch
  flex-wrap nowrap
  background white
  text-align left

  &__left
    display block
    width 100px

  &__right
    border-left 1px solid #E9E9EA
    padding 10px

  &__logo
    width 100px
    height 100px
    border-bottom 1px solid #E9E9EA
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

  &__signal
    &-wrapper
      width 100%
      padding 0
      text-align center
      border 0
    &-badge
      padding 5px

      & > div
        font-size 10px
        line-height 1.2
        border-radius 5px
        min-height 30px
        display flex
        align-items center
        justify-content center

  &__comment
    font-size 14px
    line-height 1.5
    overflow hidden
    text-overflow -o-ellipsis-lastline
    text-overflow ellipsis
    display block
    /* autoprefixer: off */
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    max-height 3em

  &__header
    display flex
    align-items flex-start
    flex-wrap nowrap

  &__toggle
    flex-grow 0
    flex-shrink 0
    margin-right -10px
    margin-top -10px
    width 36px
    height 36px
    display flex
    align-items center
    justify-content center

    &.active
      img
        transform rotate(180deg)

  &__name-symbol
    font-size 16px
    line-height 19px
    margin-bottom 5px
    display block
    flex 1

  &__name
    font-weight bold
    color #312828
    margin-right 3px

  &__symbol
    color #ABB3B9
    white-space nowrap
    display inline-block

  &__date
    font-size 13px
    color #6F7980
    line-height 16px
    margin-bottom 10px

@media (max-width 767px)
  .opinions-row
    display block
    width auto !important
    padding-bottom 25px

    td
      display block
      width auto !important
      height auto
      border-color #E9E9EA
      background-color #F7F7F7 !important

    .signal
      &-cell
        padding 0

      &-wrapper
        position static
        min-height 0
      &-badge
        padding 5px
        position static
        transform translateY(0)

    .opinion
      &-cell
        border-top 0
        border-bottom 0
        padding 0

      &-comment
        font-size 15px
        line-height 1.4
        margin 15px 10px

      &-footer
        display block
        &-left
          margin 0
          padding 0 10px 10px
          border-bottom 1px solid #E9E9EA
        &-right
          padding 10px
          margin 0

    .company
      align-items flex-start

      &-name-symbol
        font-size 17px
        display block
        line-height 1.2

      &-meta
        margin-right 0
        max-width unset
      &-share
        width 100%
</style>
