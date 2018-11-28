<template>
  <div id="app">
    <site-header />
    <site-navigation />

    <div
      class="ad-container d-none d-md-block"
      v-if="shouldShowAd">
      <Adsense
        class='ad'
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="5979276843"/>
    </div>

    <router-view class="view"/>
    <site-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteHeader from './components/layout/Header.vue'
import SiteNavigation from './components/layout/Navigation.vue'
import SiteFooter from './components/layout/Footer.vue'

export default {
  components: {
    SiteHeader,
    SiteNavigation,
    SiteFooter
  },

  computed: {
    ...mapGetters([ 'shouldShowAd' ]),
  }
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

</style>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0
  background rgba(248, 248, 248, 0.7)
  .ad
    width 728px
    max-width 100%
    min-height 90px
    margin 0 auto
</style>
