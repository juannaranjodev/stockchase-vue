<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <a :href="appUrl">
          <img class="logo" src="~assets/svgs/stockchase_white_logo.svg" alt="logo">
        </a>
        <input type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="Search for Company, Expert, or keyword...">

        <router-link to="/new">New</router-link>
        <router-link to="/show">Show</router-link>
        <router-link to="/ask">Ask</router-link>
        <router-link to="/job">Jobs</router-link>
      </nav>
    </header>
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
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0
  .github
    color #fff
    font-size .9em
    margin 0
    float right

.logo
  width 40px
  margin-right 10px
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
