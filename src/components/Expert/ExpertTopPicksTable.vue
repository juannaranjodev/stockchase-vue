<template>
  <div class="expert-top-picks">
    <h5>{{ period | displayPeriodName }} Top Picks Portfolio ({{ topPicks.length }} Top Pick)</h5>
    <table class="table expert-top-picks-table">
      <thead>
        <tr>
          <th>STOCK</th>
          <th>Top Pick</th>
          <th>LOW / HIGH</th>
          <th>Performance</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="opinion in topPicks"
          :key="`top-pick-${opinion.id}`"
        >
          <td>
            <div class="opinion">
              <div class="opinion__figure">
                <a
                  class="opinion__company-logo"
                  :href="opinion.Company.url"
                >
                  <img :src="opinion.Company.logo">
                </a>
                <div class="opinion__badge">
                  <img
                    src="~assets/svgs/top-pick-star.svg"
                    width="20"
                    height="20"
                  >
                </div>
              </div>
              <div class="opinion__content">
                <div class="opinion__company">
                  <a
                    class="opinion__company-symbol"
                    :href="opinion.Company.url"
                  >
                    {{ opinion.Company.symbol }}
                  </a>
                </div>
                <div class="opinion__text">
                  {{ opinion.Company.name }}
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="opinion-price-date">
              <div class="opinion-price">
                ${{ opinion.price | round }}
              </div>
              <a
                :href="`/opinions/view/${opinion.id}`"
                class="opinion-date"
              >
                {{ opinion.date | topPickDate }}
              </a>
            </div>
          </td>
          <td>
            <top-pick-status />
          </td>
          <td>
            <div class="opinion-performance">
              <div class="opinion-performance-price">
                ${{ opinion.diffByQuote | round }} ({{ opinion.performanceByQuote | round }}%)
              </div>
              <div class="opinion-performance-date">
                {{ opinion.quoteDate | topPickDate }}
              </div>
            </div>
          </td>
          <td>
            {{ opinion.TopPickPerformance[period] | displayPerformanceName }}
          </td>
          <td>
            <div class="add-watch-list">
              <div class="add-watch-list-link">
                <img
                  src="~assets/images/add-watchlist.png"
                  width="30"
                > Add to watch list
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TopPickStatus from './TopPickStatus';

export default {
  name: 'ExpertTopPicksTable',

  components: {
    TopPickStatus,
  },

  props: {
    topPicks: {
      type: Array,
      default: () => [],
    },
    period: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters(['user', 'expert']),
  },

  methods: {
  },
};
</script>

<style lang="stylus" scoped>
.expert-top-picks-table
  margin-top: 1rem

  thead
    th
      border-bottom: 0
      font-size: 13px
      color: #2B3440
      background-color: #F6F8FB
      height: 50px
      border-top: 0
  tbody
    td
      margin-bottom: 1px solid #EEF1F7
      font-size: 15px
      color #555
      vertical-align: middle

  .opinion
    display flex
    align-items center

    &__figure
      width 56px
      margin-right 10px
      display flex
      align-items center
      position relative
      flex-grow 0
      flex-shrink 0

    &__badge
      position absolute
      right -10px
      top -10px

    &__content
      flex 1
      overflow hidden

    &__company
      display flex
      align-items center

      &-logo
        width 56px
        height 56px
        border-radius 5px
        border 1px solid #ccc
        background white
        position relative
        display block

        img
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          margin auto
          max-width 85%
          max-height 85%
          width auto
          height auto

      &-symbol
        color #06c
        font-weight bold
        white-space nowrap
        flex-shrink 0
        text-decoration none

        span
          font-size 18px

    &__text
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 15px
      font-weight lighter
      line-height 25px
  .opinion-price-date
    .opinion-date
      opacity 0.5
      color #555
  .opinion-performance
    .opinion-performance-date
      opacity 0.5
  .add-watch-list-link
    color red
    font-size 14px
    &:hover
      cursor: pointer
</style>
