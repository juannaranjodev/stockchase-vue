<template>
  <div id="app">
    <div class="sticky-header-spacer" />
    <div class="sticky-header">
      <site-header />
      <site-navigation />
    </div>

    <div
      v-if="shouldShowAd"
      class="ad-container"
    >
      <adsense
        class="ad"
        data-ad-client="ca-pub-4241986024094799"
        data-ad-slot="3572899802"
      />
    </div>

    <router-view />

    <site-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteHeader from './components/Layout/Header.vue'
import SiteNavigation from './components/Layout/Navigation.vue'
import SiteFooter from './components/Layout/Footer.vue'

export default {
  components: {
    SiteHeader,
    SiteNavigation,
    SiteFooter
  },

  computed: {
    ...mapGetters([ 'user', 'shouldShowAd' ]),
  },

  watch: {
    user(user) {
      // Init OptinMonster for non-logged-in users
      if (user.loaded && !user.id) this.initOptinMonster()
    },
  },

  methods: {
    initOptinMonster() {
      // Converting visitors into subscribers and customers with OptinMonster - https://optinmonster.com
      var om42915_37581,om42915_37581_poll=function(){var r=0;return function(n,l){clearInterval(r),r=setInterval(n,l)}}();!function(e,t,n){if(e.getElementById(n)){om42915_37581_poll(function(){if(window['om_loaded']){if(!om42915_37581){om42915_37581=new OptinMonsterApp();return om42915_37581.init({"a":37581,"staging":0,"dev":0,"beta":0});}}},25);return;}var d=false,o=e.createElement(t);o.id=n,o.src="https://a.optnmstr.com/app/js/api.min.js",o.async=true,o.onload=o.onreadystatechange=function(){if(!d){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){try{d=om_loaded=true;om42915_37581=new OptinMonsterApp();om42915_37581.init({"a":37581,"staging":0,"dev":0,"beta":0});o.onload=o.onreadystatechange=null;}catch(t){}}}};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(o)}(document,"script","omapi-script");
    }
  },
}
</script>

<style lang="stylus">
@import '~bootstrap/dist/css/bootstrap.css'
@import '~bootstrap-vue/dist/bootstrap-vue.css'
@import '~tippy.js/dist/tippy.css'
@import './assets/css/signal.css'

body
  font normal 14px Lato, sans-serif
  line-height 1.42857143
  background-color #fff
  margin 0
  padding 0
  color #555

*
  transition all 200ms ease-in-out

</style>

<style lang="stylus" scoped>
.ad-container
  padding 20px 0
  background rgba(248, 248, 248, 0.7)
  border-bottom 1px solid #D9D9D9

  .ad
    width 728px
    max-width 100%
    min-height 90px
    margin 0 auto

@media (max-width 991px)
  .sticky-header
    position fixed
    top 0
    left 0
    right 0
    z-index 9
    background-color white

    &-spacer
      height 128px
      background rgba(248, 248, 248, 0.7)
</style>
