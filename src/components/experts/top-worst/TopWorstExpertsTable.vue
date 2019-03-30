<template>
  <table class="table top-worst-experts-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Period</th>
        <th>Big Lose</th>
        <th>Lose</th>
        <th>No Change</th>
        <th>Win</th>
        <th>Big Win</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(expert, rateIndex) in experts"
        :key="`${expert.id}-${rateIndex}`"
      >
        <td>
          <span v-if="expert.expertRank">{{ expert.expertRank }}</span>
        </td>
        <td>
          <div
            v-if="expert.expertRank"
            class="expert-details"
          >
            <div class="expert-avatar">
              <img
                :src="expert.avatar"
                alt="expert-avatar"
              >
            </div>
            <div class="expert-info-container">
              <p class="expert-name">{{ expert.name }}</p>
              <p class="expert-info">
                {{ expert.total_tp }} Top Picks | {{ expert.companies }} Total Company
              </p>
            </div>
          </div>
        </td>
        <td>
          <div class="expert-period">{{ expert.period }}</div>
          <top-worst-expert-rating :rate="expert.rate" />
        </td>
        <td>
          <span>{{ expert.big_lose }}</span>
        </td>
        <td>
          <span>{{ expert.lose }}</span>
        </td>
        <td>
          <span>{{ expert.no_change }}</span>
        </td>
        <td>
          <span>{{ expert.win }}</span>
        </td>
        <td>
          <span>{{ expert.big_win }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TopWorstExpertRating from './TopWorstExpertRating'

export default {
  name: 'TopWorstExpertsTable',

  components: {
    TopWorstExpertRating,
  },

  props: {
    experts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-worst-experts-table
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
      color: #000000
      vertical-align: middle

  .expert-details
    display: flex
    align-items: center

    .expert-avatar
      width: 36px
      height: 36px
      background-color: gainsboro
      border-radius: 50%
      overflow: hidden
      margin-right: 8px

      img
        width: 36px
        height: 36px

    .expert-name
      margin: 0
      font-weight: 700

    .expert-info
      margin: 0
      font-size: 12px
      opacity: 0.35
</style>
