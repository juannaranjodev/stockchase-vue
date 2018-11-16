<template>
  <header class="header">
    <nav class="inner">
      <div class="inner-left">
        <a :href="appUrl">
          <img class="logo" src="~assets/svgs/stockchase_white_logo.svg" alt="logo">
        </a>
        <div class="search-bar">
          <Select2 :options="ajaxOptions" :settings="{ placeholder: 'Specifies the placeholder through settings', width: '50%', ajax: ajax }" @change="ajaxChangeEvent($event)" @select="ajaxSelectEvent($event)" />
        </div>
        <!-- <input class="nav-search" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="Search for Company, Expert, or keyword..."> -->
      </div>
      <div class="inner-right">
        <a class="link" href="https://wealthica.com/?utm_source=Stockchase&utm_medium=Text%20Link&utm_campaign=Top%20Link&utm_term=Net%20Worth%20Tracking">Net worth tracking</a>
        <a class="link" href="https://app.monstercampaigns.com/c/pyfvvozlgjmvfiny48bx/">Free 72 rules eBook</a>
        <header-auth />
      </div>
    </nav>
  </header>
</template>

<script>
import * as c from '../../constants'
import Select2 from '../Select2.vue'
import HeaderAuth from './HeaderAuth.vue'

export default {
  name: 'site-header',

  components: {
    HeaderAuth,
    Select2
  },

  data () {
    return {
      appUrl: c.APP_URL,
      ajaxOptions: [],
      ajax: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        processResults (data) {
          // Tranforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.map(x => ({id:x.id, text: x.title}))
          }
        }
      },
    }
  },

  methods: {
    ajaxChangeEvent(val) {
      console.log('ajaxChangeEvent', val)
      // alert(val);
    },

    ajaxSelectEvent({ id, text, selected }) {
      console.log('ajaxChangeEvent', { id, text, selected })
    },
  }
}
</script>

<style lang="stylus" scoped>
.header
  background-color #EC4D4B
  height 82px
  display flex
  align-items center

  .logo
    width 40px

  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto
    display flex
    align-items center
    justify-content space-between

    &-left, &-right
      display flex
      align-items center

  a.link
    font-family Montserrat, san-serif;
    font-weight 400
    color white
    text-decoration none
    margin-left 2em
    &:hover
      color white

  &-auth
    margin-left 1.1em

    .button-login, .button-signup
      display inline-block
      text-transform uppercase
      text-decoration none
      padding 0.8em 0
      border-radius 4px
      width 80px
      text-align center
      &:hover
        text-decoration underline

    .button-login
      border 1px solid #E1E1E1
      color white
      font-weight 400
      margin-right .5em
      &:hover
        text-decoration underline

    .button-signup
      border-radius 4px
      border 1px solid white
      background white
      color #FF2E50

  .nav-search
    padding 5px 10px
    line-height 1.6
    display block
    margin 0
    margin-left 20px
    height 41px
    border none
    border-radius 4px
    width 360px
    outline 0
    box-shadow none
    -webkit-appearance textfield

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
</style>
