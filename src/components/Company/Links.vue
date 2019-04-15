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
      // Logic copied from https://github.com/wealthica/wealthica-data/blob/master/app.js
      const symbol = this.company.symbol.toUpperCase();

      // Canadian
      if (symbol.match(/\-T$/)) return 'TSE:' + symbol.split('-')[0]
      if (symbol.match(/\-X$/)) return 'CVE:' + symbol.split('-')[0]
      if (symbol.match(/\-CN$/)) return 'CNSX:' + symbol.split('-')[0] // CSE

      // US
      if (symbol.match(/\-Q$/)) return 'NASDAQ:' + symbol.split('-')[0]

      // For the -N suffix which is generally used for NYSE it gets a litte complicated
      // It seems some symbols on the NYSEARCA, BATS or NYSEAMERICAN (formely AMEX) use -N
      // For example IGM-N is on NYSEARCA, IGV-A on BATS and APT-A on NYSEAMERICAN
      if (symbol.match(/\-[NA]$/)) return ['NYSE', 'NYSEARCA', 'BATS', 'NYSEAMERICAN'].map(exchange => {
        return [exchange, symbol.split('-')[0]].join(':')
      })

      // US OTC
      if (symbol.match(/\-OTC$/)) return 'OTCMKTS:' + symbol.split('-')[0]

      // France (Euronext Paris)
      if (symbol.match(/\-FP$/)) return 'EPA:' + symbol.split('-')[0]

      // Germany (Frankfurt)
      if (symbol.match(/\-(GR|DE)$/)) return 'FRA:' + symbol.split('-')[0]

      // Japan
      if (symbol.match(/\-(JP|TYO)$/)) return 'TYO:' + symbol.split('-')[0]

      // Hong Kong
      if (symbol.match(/\-HK$/)) return 'HKG:' + padStart(symbol.split('-')[0], 4, '0')

      // Korean
      if (symbol.match(/\-(KS|KRX)$/)) return 'KRX:' + symbol.split('-')[0]

      // Fallback to allow anything that "looks" to be a valid symbol
      if (symbol.match(/^[A-Z0-9:\.\-]{1,12}$/)) return symbol

      return null
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
