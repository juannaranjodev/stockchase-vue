<template>
  <div class="card-view">
    <div class="card-info">
      <a :href="cardLink">
        <div :class="`card-picture ${imageSize}`">
          <img 
            :src="imageSrc"
          >
        </div>
        <h6>{{ title }}</h6>
        <p>{{ subTitle }}</p>
      </a>
      <ul
        class="card-social-links"
        v-if="expert"
      >
        <li :class="{ 'has-link': this.socialLinks && this.socialLinks.twitter }">
          <a :href="twitterUrl"><i class="icon icon-twitter"/></a>
        </li>
        <li :class="{ 'has-link': this.socialLinks && this.socialLinks.linkedin }">
          <a :href="linkedInUrl"><i class="icon icon-linkedin"/></a>
        </li>
        <li :class="{ 'has-link': this.socialLinks && this.socialLinks.facebook }">
          <a :href="facebookUrl"><i class="icon icon-facebook"/></a>
        </li>
      </ul>
    </div>
    <a :href="cardLink">
      <div class="card-footnote">
        {{ footnote }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'CardView',
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
      default: '`sub-title` here'
    },
    footnote: {
      type: String,
      default: '`footnote` here',
    },
    expert: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      type: Object,
      default: null
    },
    cardLink: {
      type: String,
      default: ''
    },
  },

  computed: {
    twitterUrl(){
      return this.socialLinks && this.socialLinks.twitter ? this.socialLinks.twitter : ''
    },
    linkedInUrl(){
      return this.socialLinks && this.socialLinks.linkedin ? this.socialLinks.linkedin : ''
    },
    facebookUrl(){
      return this.socialLinks && this.socialLinks.facebook ? this.socialLinks.facebook : ''
    },
  }
}
</script>

<style lang="stylus">
.card
  &-info
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
    width 18%
    width calc(20% - 16px)
    margin-left 10px
    margin-right 10px
    border 1px solid #E9E9EA
    display inline-block
    font-size initial
    vertical-align top
    margin-bottom 30px
    h6
      font-size 15px
      text-transform uppercase
      color #25325A
      font-weight normal
      word-wrap break-word
    p
      color #8990A5
      font-size 13px
      font-weight normal
      margin-bottom 13px
    > a:hover
      text-decoration none
  &-view:first-child, &-view:nth-child(5n+1)
    margin-left 0
  &-view:last-child, &-view:nth-child(5n)
    margin-right 0
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

