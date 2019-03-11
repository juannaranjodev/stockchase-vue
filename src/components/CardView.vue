<template>
  <div class="card-view">
    <div class="card-info">
      <div :class="'card-picture '+imageSize">
        <img 
          :src="'https://stockchase.s3.amazonaws.com/'+imageSrc"
        >
      </div>
      <h6>{{ title }}</h6>
      <p>{{ subTitle }}</p>
    </div>
    <div class="card-footnote">
      {{ footnote }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  props: {
    imageSrc: {
      type: String,
      default: '/images/expert_profile_default.svg',
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
    }
  },
}
</script>

<style lang="stylus">
.card
  &-info
    min-height 290px
    padding 10px
    text-align center
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
  &-view:first-child
    margin-left 0
  &-view:last-child
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
</style>

