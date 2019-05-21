<template>
  <div id="app">
    <div class="sticky-header-spacer" />
    <div class="sticky-header">
      <site-header />
      <site-navigation />
    </div>

    <router-view />

    <site-footer />
    <stock-saved-modal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SiteHeader from './components/Layout/Header.vue';
import SiteNavigation from './components/Layout/Navigation.vue';
import SiteFooter from './components/Layout/Footer.vue';
import StockSavedModal from './components/StockSavedModal.vue';

export default {
  components: {
    SiteHeader,
    SiteNavigation,
    SiteFooter,
    StockSavedModal,
  },

  computed: {
    ...mapGetters(['user']),
  },

  watch: {
    user(user) {
      // Init OptinMonster for non-logged-in users
      if (user.loaded && !user.id) this.initOptinMonster();
    },
  },

  asyncData({ store }) {
    return store.dispatch('FETCH_DISQUS_COMMENTS_COUNT');
  },

  methods: {
    /* eslint-disable */
    initOptinMonster() {
      // Converting visitors into subscribers and customers with OptinMonster
      // https://optinmonster.com
      let om42915_37581; const om42915_37581_poll = (function () { let r = 0; return function (n, l) { clearInterval(r), r = setInterval(n, l); }; }()); !(function (e, t, n) {
        if (e.getElementById(n)) {
          om42915_37581_poll(() => {
            if (window.om_loaded) {
              if (!om42915_37581) {
                om42915_37581 = new OptinMonsterApp(); return om42915_37581.init({
                  a: 37581, staging: 0, dev: 0, beta: 0,
                });
              }
            }
          }, 25); return;
        } let d = false; const o = e.createElement(t); o.id = n, o.src = 'https://a.optnmstr.com/app/js/api.min.js', o.async = true, o.onload = o.onreadystatechange = function () {
          if (!d) {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
              try {
                d = om_loaded = true; om42915_37581 = new OptinMonsterApp(); om42915_37581.init({
                  a: 37581, staging: 0, dev: 0, beta: 0,
                }); o.onload = o.onreadystatechange = null;
              } catch (t) {}
            }
          }
        }; (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(o);
      }(document, 'script', 'omapi-script'));
    },
    /* eslint-enable */
  },
};
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
</style>

<style lang="stylus" scoped>
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
