<template>
  <ul class="company-links">
    <li>
      <a
        class="company-link"
        :href="`http://www.theglobeandmail.com/globe-investor/markets/stocks/chart/?q=${company.symbol}`"
      >
        <img
          src="~assets/svgs/magazine-icon.svg"
          width="20"
        >
        <span>{{ company.symbol }} on the Globe and Mail</span>
      </a>
    </li>
    <li>
      <a
        class="company-link"
        :href="`http://finance.google.ca/finance?q=${googleSymbol}`"
      >
        <img
          src="~assets/svgs/google-icon.svg"
          width="20"
        >
        <span>{{ company.symbol }} on Google Finance</span>
      </a>
    </li>
    <li>
      <a
        class="company-link"
        :href="`http://finance.yahoo.com/q?s=${yahooSymbol}`"
      >
        <img
          src="~assets/svgs/yahoo-icon.svg"
          width="20"
        >
        <span>{{ company.symbol }} on Y! Finance</span>
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Links',

  computed: {
    ...mapGetters(['company']),

    googleSymbol() {
      const [symbol, exchange] = this.company.symbol.split('-')

      switch (exchange) {
        case 'T': // toronto
          return `TSE:${symbol}`
        case 'X': // TSX Venture
          return `CVE:${symbol}`
        case 'N': // New york
          return `NYSE:${symbol}`
        case 'A': // American
        case 'Q': // nasdaq
          return `NASDAQ:${symbol}`
        case 'Q2': // OTCBB
          return `OTC:${symbol}`
        case 'M': // montreal
        case 'I': // index
        default:
          return symbol
      }
    },

    yahooSymbol() {
      const [symbol, exchange] = this.company.symbol.split('-')
      let yahooSymbol = symbol

      switch (exchange) {
        case 'T': // toronto
          yahooSymbol = `${symbol}.TO`
          break
        case 'X': // TSX Venture
          yahooSymbol = `${symbol}.V`
          break
        case 'Q2': // OTCBB
          yahooSymbol = `${symbol}.OB`
          break
        case 'N': // New york
        case 'A': // American
        case 'Q': // nasdaq
        case 'M': // montreal
        case 'I': // index
        default:
      }

      return yahooSymbol.toLowerCase()
    }
  },
}
</script>

<style lang="stylus" scoped>
.company-link
  &s
    border-left 1px solid #ABB3B9
    margin 0
    padding 5px 0
    padding-left 15px
    list-style-type none

    li
      margin 5px 0
      line-height 25px

      &:first-child
        margin-top 0
      &:last-child
        margin-bottom 0

  color #138FFF
  display flex
  align-items center
  white-space nowrap
  font-size 15px
  text-decoration none

  img
    margin-right 5px

@media (max-width 991px)
  .company-link
    &s
      border-left 0
      padding-left 0
</style>
