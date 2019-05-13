<template>
  <table class="table top-worst-experts-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Period</th>
        <th>Big Lose</th>
        <th>Lose</th>
        <th>No Change</th>
        <th>Win</th>
        <th>Big Win</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(expert, rateIndex) in collapsedExperts"
        :key="`${expert.expert_id}-${rateIndex}`"
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
              <a
                :href="expert.url"
                class="expert-name"
              >{{ expert.name }}</a>
              <p class="expert-info">
                {{ expert.total_tp }} Top Picks | {{ expert.companies }} Total Companies
              </p>
            </div>
          </div>
        </td>
        <td>
          <div class="expert-period">
            {{ expert.period }}
          </div>
          <expert-rating
            :rating="Number(expert.rate)"
            :total-wins="expert.totalWins"
            :total-loses="expert.totalLoses"
          />
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.big_lose || 0 }}
          </a>
          <span class="expert-tp-count-percent">
            {{ expert.big_lose | percentageAgainst(expert.totalLoses) | formatPercentage }}
          </span>
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.lose || 0 }}
          </a>
          <span class="expert-tp-count-percent">
            {{ expert.lose | percentageAgainst(expert.totalLoses) | formatPercentage }}
          </span>
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.no_change || 0 }}
          </a>
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.win || 0 }}
          </a>
          <span class="expert-tp-count-percent">
            {{ expert.win | percentageAgainst(expert.totalWins) | formatPercentage }}
          </span>
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.big_win || 0 }}
          </a>
          <span class="expert-tp-count-percent">
            {{ expert.big_win | percentageAgainst(expert.totalWins) | formatPercentage }}
          </span>
        </td>
        <td>
          <i
            v-if="expert.expertRank"
            :class="{
              fas: true,
              'fa-angle-down': collapsedStatus[expert.expert_id],
              'fa-angle-up': !collapsedStatus[expert.expert_id],
            }"
            @click="toggleCollapse(expert.expert_id)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ExpertRating from '../../ExpertRating.vue';

export default {
  name: 'TopWorstExpertsTable',

  components: {
    ExpertRating,
  },

  props: {
    experts: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      collapsedStatus: this.initCollapsedStatus(this.experts),
    };
  },

  computed: {
    collapsedExperts() {
      return this.experts
        .filter(expert => expert.expertRank || !this.collapsedStatus[expert.expert_id]);
    },
  },

  watch: {
    experts(newExperts) {
      this.collapsedStatus = this.initCollapsedStatus(newExperts);
    },
  },

  methods: {
    toggleCollapse(expertId) {
      this.collapsedStatus[expertId] = !this.collapsedStatus[expertId];
    },

    initCollapsedStatus(experts) {
      const collapsedStatus = {};
      experts.filter(expert => expert.expertRank)
        .forEach((expert) => {
          collapsedStatus[expert.expert_id] = true;
        });

      return collapsedStatus;
    },
  },
};
</script>

<style lang="stylus" scoped>
.top-worst-experts-table
  margin-top: .5rem

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
    min-width: 180px

    .expert-avatar
      width: 36px
      height: 36px
      background-color: gainsboro
      border-radius: 50%
      overflow: hidden
      margin-right: 8px
      min-width: 36px

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

  .expert-tp-count-percent
    font-size: 12px
    opacity: 0.35
    padding-left: 4px

  .link-to-card
    color: #000;

    &:hover
      cursor: pointer
      text-decoration underline

  .fas
    &:hover
      cursor: pointer
</style>
