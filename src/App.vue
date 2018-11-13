<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <a :href="appUrl">
          <img class="logo" src="~assets/svgs/stockchase_white_logo.svg" alt="logo">
        </a>
        <input type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="Search for Company, Expert, or keyword...">
      </nav>
    </header>
    <div class="navigation">
      <nav class="inner">
        <a :href="appUrl">
          <img class="home" src="~assets/images/stockchase-home-icon.png" alt="logo">
        </a>
        <a :href="appUrl + '/opinions/recent'">All Opinions</a>
      </nav>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import * as c from './constants'

export default {
  data () {
    return {
      appUrl: c.APP_URL,
    }
  },
}
</script>

<style lang="stylus">
body
  font-family Lato, sans-serif;
  font-size 14px
  background-color #fff
  margin 0
  padding 0
  color #555

a
  color #34495e
  text-decoration none

.header
  background-color #EC4D4B
  height 82px
  display flex
  align-items center
  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 400
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff

.logo
  width 40px
  margin-right 10px
  display inline-block
  vertical-align middle

.navigation
  background-color #fff
  border-bottom 1px solid #D9D9D9
  height 70px
  display flex
  align-items center
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

.home
  width 20px
  display inline-block
  vertical-align middle

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
