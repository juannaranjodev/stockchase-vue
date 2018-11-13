<template>
  <div class="footer">
    <nav class="inner">
      <div class="footer__left">
        <img src="/images/stockchase-by-wealthica-white-logo.svg" width="190" style="float: left;">
      </div>
      <div class="footer__center">
        <div style="width: 87%;">
          <p>Stockchase,  in its reporting on what has been discussed by indviduals on business television programs (in particular Business News Network), neither recommends nor promotes any investment strategies.</p>

          <p>We paraphrase the experts by hand, we watch the shows and write down what we understood from the experts’ comments. <span style="font-weight: bold;">We are human and can make mistakes</span>, help us fix any errors. If you see something that you know is not right or if there is a problem with the site, feel free to email us at : <a href="mailto:hello@stockchase.com" style="color: #FFFFFF;">hello@stockchase.com</a>.</p>
        </div>

        <ul class="footer-list-menu">
          <li><a href="https://stockchase.com/page/view/about-us">About us</a></li>
          <li><a href="https://stockchase.com/blog/post/how-this-site-works">How to use</a></li>
          <li><a href="https://stockchase.com/page/view/in-the-news">In the news</a></li>
          <li><a href="https://stockchase.com/page/view/advertising">Advertising</a></li>
          <li><a href="mailto:hello@stockchase.com">@Contact us</a></li>
        </ul>

        <ul class="footer-list-menu" style="margin-top:0;">
          <li><a href="https://stockchase.com/page/view/privacy">Privacy Policy</a></li>
          <li><a href="https://stockchase.com/page/view/privacy">Terms of service</a></li>
        </ul>

        <div style="float: right; margin-top: -47px;">
          <a href="https://stockchase.com/rss/toppicks" style="margin-right: 7px;"><img src="/images/rss-light-icon.png" width="35"></a>
          <a href="https://stockchase.com/rss/daily" style="margin-right: 7px;"><img src="/images/rss-light-icon.png" width="35"></a>
          <a href="https://www.facebook.com/stockchase" style="margin-right: 7px;"><img src="/images/facebook-footer-icon.svg" width="35"></a>
          <a href="http://twitter.com/stockchase" style="margin-right: 0;"><img src="/images/twitter-footer-icon.svg" width="35"></a>
        </div>
      </div>
      <div style="clear: both;"></div>
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
