<template>
  <tr class="opinions-row" :id="item.id">
    <td class="signal-cell">
      <div :class="`signal-wrapper ${signalClassName} ${signalClassName}-border-cell`">
        <div class="signal-badge">
          <div :class="`${signalClassName}-border`" style="border-radius: 5px;">
            {{ item.Signal.name.toUpperCase() }}
          </div>
        </div>
      </div>
    </td>

    <td class="opinion-cell">
      <div class="opinion">
        <div class="opinion-main">
          <div class="company">
            <a class="company-logo" :href="item.Company.url">
              <img :src="item.Company.logo">
            </a>
            <div class="company-meta">
              <a class="company-name-symbol" :href="item.Company.url">
                <span class="company-name">{{ item.Company.name }}</span>
                <span class="company-symbol">({{ item.Company.symbol }})</span>
              </a>
              <div class="opinion-date">
                {{ item.date | formatDate }}
              </div>
            </div>
            <div class="company-share">
              <a class="btn-share" href="#">
                <img src="~assets/svgs/share.svg">
              </a>
            </div>
          </div>
          <div class="opinion-comment" v-html="item.comment"></div>
        </div>
        <div class="opinion-footer">
          <div class="opinion-footer-left">
            <div v-if="item.Company.Sector.name !== '0'" class="opinion-sector-badge">{{ item.Company.Sector.name }}</div>
          </div>
          <div class="opinion-footer-right">
            <div ref="reactionsTooltip">
              <user-reactions :item="item" />
            </div>

            <div ref="userReactions" :class="{ 'opinion-rating': true, 'no-rating': !myRating }">
              <img v-if="!myRating" src="~assets/images/smileys/smiley-glasses.png" width="25">
              <img v-if="myRating" :src="myRatingImage" width="35">
              <span v-if="myRating" >You, and {{ numSameRatings }} Others</span>
            </div>

            <a class="btn-comment" @click="showComments">
              <img src="~assets/svgs/comment_icon.svg">
              <span class="disqus-comment-count" :data-disqus-identifier="disqusIdentifier">0 Comments</span>
            </a>
          </div>
        </div>
      </div>
    </td>

    <td class="expert-cell">
      <a :href="item.Expert.url" class="expert-name">
        {{ item.Expert.name }}
      </a>
      <div class="expert-title">
        {{ item.Expert.title }}
      </div>

      <div class="expert-meta">
        <div v-b-tooltip.hover title="Price">
          <img src="~assets/images/price_icon@2x.png" width="18" alt="Price">
        </div>
        <div>
          ${{ item.price }}
        </div>
      </div>
      <div class="expert-meta">
        <div v-b-tooltip.hover title="Owned">
          <img src="~assets/images/owned_icon@2x.png" width="18" alt="Owned">
        </div>
        <div>
          {{ item.Ownership.name }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { timeAgo } from '../../util/filters'
import { getRatingImage } from '../../util/rating'
import UserReactions from './UserReactions.vue'
import _ from 'lodash'
import md5 from 'md5'

let tippy
if (process.browser) {
  tippy = require('tippy.js').default
}

export default {
  name: 'opinions-item',
  props: ['item'],
  serverCacheKey: ({ item: { id }}) => {
    return `opinion::${id}`
  },

  components: { UserReactions },

  computed: {
    signalClassName() {
      return this.toClassName(this.item.Signal.name)
    },

    disqusIdentifier() {
      return md5(this.item.url)
    },

    myRating() {
      const ratings = this.$store.getters.user.SocialRatings
      if (!ratings || !_.keys(ratings).length) return

      const matched = _.find(ratings, { content_type: 'opinion', opinion: this.item.id })

      return matched
    },

    myRatingImage() {
      return getRatingImage(this.myRating.rating)
    },

    numSameRatings() {
      return 0
    }
  },

  methods: {
    showComments() {
      this.$emit('showComments', this.item)
    },

    toClassName(signal) {
      return _.snakeCase(signal)
    },

    onMouseOver() {
      this.$refs.ratingDropdown.show()
    },

    onMouseLeave() {
      this.$refs.ratingDropdown.hide()
    },
  },

  mounted() {
    tippy(this.$refs.userReactions, {
      content: this.$refs.reactionsTooltip,
      interactive: true,
      theme: 'stockchase',
      animateFill: false,
      distance: 5
    })
  },

  beforeDestroy() {
    if (this.$refs.userReactions && this.$refs.userReactions._tippy) {
      this.$refs.userReactions._tippy.destroy()
    }
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
      font-size 10.5px
      position absolute
      top 0
      height 100%
    &-badge
      padding 5px
      position relative
      top 50%
      transform translateY(-45%)

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
      img
        margin-right 3px
        margin-top -2px

  .company
    display flex
    align-items center

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
        width 85%
        height auto
    &-meta
      flex 1

    &-share
      margin-left 10px

    &-name-symbol
      font-size 21px
      font-weight bold
      text-decoration none
      color #000

    &-name-symbolhover
      color #09f
    &-name
      color inherit
    &-symbol
      color #ABB3B9
      margin-left 3px

  .opinion
    display flex
    flex-direction column
    align-items stretch
    justify-content space-between
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
      justify-content space-between
      &-left, &-right
        display flex
        align-items center
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

</style>
