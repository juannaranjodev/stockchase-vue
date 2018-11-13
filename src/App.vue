<template>
  <div id="app">
    <site-header />
    <site-navigation />
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Navigation from './components/layout/Navigation.vue'

export default {
  components: {
    'site-header': Header,
    'site-navigation': Navigation
  },
}
</script>

<style lang="stylus">
@import '~bootstrap/dist/css/bootstrap.css'
@import '~bootstrap-vue/dist/bootstrap-vue.css'

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
