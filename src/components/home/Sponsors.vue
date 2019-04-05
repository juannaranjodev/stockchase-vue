<template>
  <div class="sponsors">
    <h3 class="sponsors__title">
      Premium Sponsors & Offers
    </h3>

    <div class="sponsors__list">
      <div
        v-for="sponsor in sponsors"
        :key="sponsor.name"
      >
        <div
          v-if="sponsor.featured"
          class="sponsors__featured-item"
        >
          <div class="sponsors__featured-item-image">
            <img :src="sponsor.image">
          </div>
          <div class="sponsors__featured-item-content">
            <h4 class="sponsors__featured-item-name">
              <a
                :href="sponsor.link"
                target="_blank"
                :title="sponsor.name"
              >{{ sponsor.name }}</a>
            </h4>
            <div class="sponsors__featured-item-text">
              {{ sponsor.content }}
            </div>
            <a
              :href="sponsor.link"
              target="_blank"
              :title="sponsor.name"
              class="sponsors__featured-item-link"
            >
              <span>Get it free</span>
              <img
                src="~assets/images/icon-arrow-right@2x.png"
                height="11"
              >
            </a>
          </div>
        </div>

        <a
          v-else
          :href="sponsor.link"
          target="_blank"
          :title="sponsor.name"
          class="sponsors__item"
        >
          <div class="sponsors__item-title">
            <img :src="sponsor.image">
            <h4 class="sponsors__item-name">{{ sponsor.name }}</h4>
          </div>
          <div class="sponsors__item-content">{{ sponsor.content }}</div>
        </a>
      </div>
    </div>

    <div class="sponsors__footer">
      These sponsors make Stockchase possible. Add your company or sponsored posts here.
    </div>

    <hr class="home-divider">
  </div>
</template>

<script>
export default {
  name: 'Sponsors',

  data() {
    return {
      sponsors: [
        {
          name: 'Wealthica',
          content: 'Free Painless Net Worth Tracking',
          link: 'https://wealthica.com/?utm_source=Stockchase&amp;utm_medium=Text%20Link&amp;utm_campaign=Sidebar%20Link&amp;utm_term=Wealthica',
          image: require('../../assets/images/wealthica-icon.png')
        },
        {
          name: 'Questrade',
          content: '50$ in Comission Free Trades',
          link: 'http://www.questrade.com/?refid=ifugidvd',
          image: require('../../assets/images/questrade-icon.png')
        },
        {
          name: 'Market Masters',
          content: 'Top Investors Reveal Tips & Tricks',
          link: 'https://www.amazon.ca/gp/product/177041343X/ref=as_li_tl?ie=UTF8&camp=15121&creative=330641&creativeASIN=177041343X&linkCode=as2&tag=stockchase-20&linkId=bf68d5e9186826e5fbfe5245f486bbaf',
          image: require('../../assets/images/amazon-icon.png')
        },
        {
          name: 'Robin R. Speziale’s 72 rules on investing in Stocks.',
          content: 'Beat the market and make money investing in growth stocks.',
          link: 'https://app.monstercampaigns.com/c/pyfvvozlgjmvfiny48bx/',
          image: require('../../assets/images/72rules.png'),
          featured: true,
        },
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
.sponsors
  &__title
    color #FF2E50
    font-weight bold
    font-size 13px
    margin-bottom 25px
    text-transform uppercase

  &__item
    margin-bottom 25px
    display block

    &-title
      display flex
      align-items center
      margin-bottom 3px

      img
        margin-right 15px

    &-name
      font-size 16px
      font-weight bold
      color #111
      margin 0

    &-content
      color #333
      font-size 12px

  &__featured-item
    display flex
    align-items flex-start
    flex-wrap nowrap
    padding 20px 20px 25px 20px
    border 1px solid #E8E8E8
    border-radius 3px
    margin-bottom 25px

    &-image
      display flex
      align-items center
      margin-right 20px

      img
        width 110px
        height 165px

    &-content
      overflow hidden

    &-name
      margin 0
      font-size 16px
      font-weight bold
      line-height 1.5em
      margin-bottom .2em

      a
        text-decoration none
        color black

    &-text
      line-height 1.5em
      margin-bottom .4em

    &-link
      font-size 1.1em
      font-weight 600
      color #FF5030
      text-decoration underline
      display flex
      align-items center

      img
        margin-left 5px

  &__footer
    color #ABB3B9
    font-size 12px

</style>
