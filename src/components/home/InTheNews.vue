<template>
  <div class="in-the-news">
    <h3 class="in-the-news__title">Stocks In The News</h3>

    <table class="in-the-news__stocks">
      <tbody>
        <tr class="in-the-news__stock">
          <td class="in-the-news__stock-image">
            <a href="https://stockchase.com/company/view/5772/N-X">
              <img
                src="~assets/images/stock-logo.jpg"
                alt="Tesla to buy battery tech maker"
                title="Tesla to buy battery tech maker"
              >
            </a>
          </td>
          <td class="in-the-news__stock-date">4/Feb</td>
          <td class="in-the-news__stock-hint">
            <div class="in-the-news__stock-hint-content">
              <a href="https://stockchase.com/company/view/5772/N-X">Namaste Technologies Inc.</a> Namaste fires CEO
            </div>
          </td>
          <td class="in-the-news__stock-source">
            [ <a href="https://www.bnnbloomberg.ca/namaste-fires-ceo-sean-dollinger-launches-strategic-review-1.1208740">BNN Bloomberg</a> ]
          </td>
          <td class="in-the-news__stock-company">
            <a href="https://stockchase.com/company/view/5772/N-X">N-X</a>
          </td>
        </tr>
        <tr class="in-the-news__stock">
          <td class="in-the-news__stock-image">
            <img
              src="~assets/images/stock-nologo.png"
              alt="Tesla to buy battery tech maker"
              title="Tesla to buy battery tech maker"
            >
          </td>
          <td class="in-the-news__stock-date">4/Feb</td>
          <td class="in-the-news__stock-hint">
            <div class="in-the-news__stock-hint-content">
              23 Stock Top Picks and 3 ETF  Jan 25-31
            </div>
          </td>
          <td class="in-the-news__stock-source">
            [ <a href="https://www.bnnbloomberg.ca/namaste-fires-ceo-sean-dollinger-launches-strategic-review-1.1208740">Read more</a> ]
          </td>
          <td class="in-the-news__stock-company">
            &nbsp;
          </td>
        </tr>
        <tr class="in-the-news__stock">
          <td class="in-the-news__stock-image">
            <img
              src="~assets/images/stock-nologo.png"
              alt="Tesla to buy battery tech maker"
              title="Tesla to buy battery tech maker"
            >
          </td>
          <td class="in-the-news__stock-date">4/Feb</td>
          <td class="in-the-news__stock-hint">
            <div class="in-the-news__stock-hint-content">
              23 Stock Top Picks and 3 ETF  Jan 25-31
            </div>
          </td>
          <td class="in-the-news__stock-source">
            [ <a href="https://www.bnnbloomberg.ca/namaste-fires-ceo-sean-dollinger-launches-strategic-review-1.1208740">Read more</a> ]
          </td>
          <td class="in-the-news__stock-company">
            &nbsp;
          </td>
        </tr>
        <tr class="in-the-news__stock">
          <td class="in-the-news__stock-image">
            <img
              src="~assets/images/stock-nologo.png"
              alt="Tesla to buy battery tech maker"
              title="Tesla to buy battery tech maker"
            >
          </td>
          <td class="in-the-news__stock-date">4/Feb</td>
          <td class="in-the-news__stock-hint">
            <div class="in-the-news__stock-hint-content">
              23 Stock Top Picks and 3 ETF  Jan 25-31
            </div>
          </td>
          <td class="in-the-news__stock-source">
            [ <a href="https://www.bnnbloomberg.ca/namaste-fires-ceo-sean-dollinger-launches-strategic-review-1.1208740">Read more</a> ]
          </td>
          <td class="in-the-news__stock-company">
            &nbsp;
          </td>
        </tr>
        <tr class="in-the-news__stock">
          <td class="in-the-news__stock-image">
            <img
              src="~assets/images/stock-nologo.png"
              alt="Tesla to buy battery tech maker"
              title="Tesla to buy battery tech maker"
            >
          </td>
          <td class="in-the-news__stock-date">4/Feb</td>
          <td class="in-the-news__stock-hint">
            <div class="in-the-news__stock-hint-content">
              23 Stock Top Picks and 3 ETF  Jan 25-31
            </div>
          </td>
          <td class="in-the-news__stock-source">
            [ <a href="https://www.bnnbloomberg.ca/namaste-fires-ceo-sean-dollinger-launches-strategic-review-1.1208740">Read more</a> ]
          </td>
          <td class="in-the-news__stock-company">
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>

    <div class="in-the-news__footer">
      <a
        class="in-the-news__more"
        href="/discover/news"
      >More stocks in the news...</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeInTheNews',
  serverCacheKey: () => {
    return `home::in-the-news`
  },
}
</script>

<style lang="stylus" scoped>
.in-the-news

  &__title
    color #bfbfbf
    text-transform uppercase
    font-weight bold
    margin-bottom 0
    font-size 1.4em
    line-height 1

  &__stock
    &s
      width 100%
      max-width 100%

    td
      border-bottom 1px solid #DDD
      padding 7px 10px
      height 30px

      &:first-child
        padding-left 0
      &:last-child
        padding-right 0

    &-image
      width 50px

      img
        max-width 40px
        max-height 30px

    &-date
      color #D9AFB5
      font-size 18px
      font-weight bold
      width 1px

    &-hint
      color #888
      font-size 18px

      &-content
        max-width 280px
        display inline-block
        width 100%
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        vertical-align middle

        a
          text-decoration underline
          color #1B475E

          &:hover
            color #EC4D4B

    &-source
      color #888
      font-size 18px
      white-space nowrap
      width 100%

      a
        text-decoration underline
        color #888

        &:hover
          color #EC4D4B

    &-company
      a
        font-size 18px
        font-weight bold
        color #8F93A0
        background-color #D8D8D8
        padding 2px 10px
        border-radius 5px
        white-space nowrap

        &:hover
          text-decoration none
          background-color #EC4D4B
          color white

  &__footer
    padding 8px 0

  &__more
    color #bfbfbf
    text-decoration none
    font-size 18px

    &:hover
      color inherit

</style>
