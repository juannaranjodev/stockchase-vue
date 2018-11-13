<template>
  <div class="footer">
    <nav class="inner">
      Footer content
    </nav>
    <div class="copyright">© Stockchase Inc. & Wealthica Financial Technology Inc.</div>
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
.footer
  border-top 1px solid #E9E9EA
  padding 0 20px
  background #605E5E

  .inner
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 2em 0 1em
    margin 0 auto
    color black
    font-weight 300

  .copyright
    margin-top 0
    padding 1.5em 0 0.8em
    text-align center
    border-top 1px solid #9C9C9C
    margin-bottom 0
    color #FFFFFF
    padding-bottom 20px
    font-size 14px
    font-weight lighter

</style>
