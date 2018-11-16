<template>
  <div id="app">
    <site-header />
    <site-navigation />
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <site-footer />
  </div>
</template>

<script>
import SiteHeader from './components/layout/Header.vue'
import SiteNavigation from './components/layout/Navigation.vue'
import SiteFooter from './components/layout/Footer.vue'

export default {
  components: {
    SiteHeader,
    SiteNavigation,
    SiteFooter
  },
}
</script>

<style lang="stylus">
@import '~bootstrap/dist/css/bootstrap.css'
@import '~bootstrap-vue/dist/bootstrap-vue.css'
@import '~tippy.js/dist/tippy.css'
@import './assets/css/signal.css'

body
  font-family Lato, sans-serif;
  font-size 14px
  background-color #fff
  margin 0
  padding 0
  color #555

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0
</style>
