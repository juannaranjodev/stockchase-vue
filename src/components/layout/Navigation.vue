<template>
  <div class="navigation">
    <nav class="inner">
      <a :href="appUrl">
        <img class="home" src="~assets/images/stockchase-home-icon.png" alt="logo">
      </a>
      <a :href="appUrl + '/opinions/recent'" class='active'>All Opinions</a>
    </nav>
  </div>
</template>

<script>
import * as c from '../../constants'

export default {
  name: 'site-navigation',

  data () {
    return {
      appUrl: c.APP_URL,
    }
  },
}
</script>

<style lang="stylus" scoped>
.navigation
  background-color #fff
  border-bottom 1px solid #D9D9D9
  height 70px
  display flex
  align-items center

  .home
    width 20px

  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto
  a
    font-size 16px
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 400
    margin-right 1.8em
    &:hover
      text-decoration none
    &.active
      color #EC4D4B
      border-bottom: 2px solid #EC4D4B

</style>
