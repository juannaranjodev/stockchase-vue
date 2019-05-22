<template>
  <table class="table expert-rating-table">
    <thead>
      <tr>
        <th>All</th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/rating.svg"
              width="16"
            />
            RATING
          </div>
          4.7 <span class="percentage">(17%)</span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-big-win.svg"
              width="16"
            />
            BIG WIN
          </div>
          4.7 <span class="percentage">(17%)</span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-win.svg"
              width="16"
            />
            WIN
          </div>
          4.7 <span class="percentage">(17%)</span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-neutral.svg"
              width="16"
            />
            NEUTRAL
          </div>
          4.7 <span class="percentage">(17%)</span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-loss.svg"
              width="16"
            />
            LOSS
          </div>
          4.7 <span class="percentage">(17%)</span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-big-loss.svg"
              width="16"
            />
            BIG LOSS
          </div>
          4.7 <span class="percentage">(17%)</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="period-name">1 Month</td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
      </tr>
      <tr>
        <td class="period-name">6 Months</td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
      </tr>
      <tr>
        <td class="period-name">12 Months</td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
      </tr>
      <tr>
        <td class="period-name">2 Years</td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
      </tr>
      <tr>
        <td class="period-name">5 Years</td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
        <td>4.7 <span class="percentage">(17%)</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ExpertRatingTable',

  computed: {
    ...mapGetters(['expert']),
  },
};
</script>

<style lang="stylus" scoped>
.expert-rating-table
  thead
    border-radius 5px
    box-shadow 0 4px 14px rgba(black, 0.14)

    th
      border-bottom: 0
      font-size: 14px
      color: #000000
      background-color: #FFFFF
      height: 51px
      border-top: 0
      padding: 4px 8px
      vertical-align: middle

    .th-description
      display: flex
      color: #2B3440
      font-size: 10px

      img
        margin-right: 4px
  tbody
    td
      font-size: 15px
      color: #000000
      vertical-align: middle
      padding: 6px 8px
    .period-name
      opacity: 0.5
      font-size: 14px
      font-weight: bold
  .percentage
    opacity: 0.35
    font-size: 15px
    font-weight: bold
</style>
