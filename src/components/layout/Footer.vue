<template>
  <div class="footer">
    <nav class="inner">
      <div class="footer__left">
        <img
          src="~assets/svgs/stockchase-by-wealthica-white-logo.svg"
          width="190"
          style="float: left;">
      </div>
      <div class="footer__center">
        <div style="width: 87%;">
          <p>Stockchase,  in its reporting on what has been discussed by individuals on business television programs (in particular Business News Network), neither recommends nor promotes any investment strategies.</p>

          <p>We paraphrase the experts by hand, we watch the shows and write down what we understood from the experts’ comments. <span style="font-weight: bold;">We are human and can make mistakes</span>, help us fix any errors. If you see something that you know is not right or if there is a problem with the site, feel free to email us at : <a
            href="mailto:hello@stockchase.com"
            style="color: #FFFFFF;">hello@stockchase.com</a>.</p>
        </div>

        <ul class="footer-list-menu">
          <li><a :href="appUrl + '/page/view/about-us'">About us</a></li>
          <li><a :href="appUrl + '/blog/post/how-this-site-works'">How to use</a></li>
          <li><a :href="appUrl + '/page/view/in-the-news'">In the news</a></li>
          <li><a :href="appUrl + '/page/view/advertising'">Advertising</a></li>
          <li><a href="mailto:hello@stockchase.com">@Contact us</a></li>
        </ul>

        <ul class="footer-list-menu">
          <li><a :href="appUrl + '/page/view/privacy'">Privacy Policy</a></li>
          <li><a :href="appUrl + '/page/view/privacy'">Terms of service</a></li>
        </ul>

        <div class="footer-social-links">
          <a
            :href="appUrl + '/rss/toppicks'"
            style="margin-right: 7px;"><img
              src="~assets/images/rss-light-icon.png"
              width="35"></a>
          <a
            :href="appUrl + '/rss/daily'"
            style="margin-right: 7px;"><img
              src="~assets/images/rss-light-icon.png"
              width="35"></a>
          <a
            href="https://www.facebook.com/stockchase"
            style="margin-right: 7px;"><img
              src="~assets/svgs/facebook-footer-icon.svg"
              width="35"></a>
          <a
            href="http://twitter.com/stockchase"
            style="margin-right: 0;"><img
              src="~assets/svgs/twitter-footer-icon.svg"
              width="35"></a>
        </div>
      </div>
      <div style="clear: both;"/>
    </nav>
    <div class="copyright">© Stockchase Inc.</div>
  </div>
</template>

<script>
import * as c from '../../constants'

export default {
  name: 'SiteFooter',

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

  &__left
    width 15%
    float left
    padding-left 24px
    height 220px

  &__center
    float left
    width 82%
    padding-left 70px
    box-sizing border-box
    padding-right 20px
    height 220px

    p
      margin-top 0
      line-height 1.38em
      margin-bottom 1.4em
      font-size 15px
      text-align left
      color #FFFFFF
      line-height 24px

  &-list-menu
    padding 0
    margin 0
    margin-top -5px

    & + .footer-list-menu
      margin-top 0

    li
      display inline-block
      margin-right 10px
      font-size 14pt
      line-height 1.6
      font-weight 500
      a
        color #FFFFFF
        font-size 15px
  &-social-links
    float right
    margin-top -47px

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

@media (max-width 767px)
  .footer
    padding 0 10px

    &__left, &__center
      height auto
      width 100%
      padding 0

    &-list-menu
      margin 0
    &-social-links
      margin-top 30px
</style>
