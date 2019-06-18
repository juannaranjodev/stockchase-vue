<template>
  <!-- eslint-disable max-len -->
  <table class="table top-worst-experts-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>
          <div
            class="header-column-ranking"
            @click="$emit('toggleOrderBy')"
          >
            Rating
            <info-tooltip title="Star rating is based on the most wins in the investing horizon. If the expert has the mostly BIG WIN (+20% Gain) he gets 5 stars, mostly WIN (3% to 20% Gain) he gets 4 star, mostly Neutral (-3% to 3% Gain/Loss) he gets 3 stars, mostly LOSS (-20% to -3%) he gets 2 stars and mostly BIG LOSS (> -20% loss) he gets 1 star." />
            <i
              :class="{
                fas: true,
                'fa-angle-down': orderBy === 'ASC',
                'fa-angle-up': orderBy === 'DESC',
              }"
            />
          </div>
        </th>
        <th>
          Big Lose
          <info-tooltip title="> -20% loss" />
        </th>
        <th>
          Lose
          <info-tooltip title="-20% to -3%" />
        </th>
        <th>
          No Change
          <info-tooltip title="-3% to 3% Gain/Loss" />
        </th>
        <th>
          Win
          <info-tooltip title="3% to 20% Gain" />
        </th>
        <th>
          Big Win
          <info-tooltip title="+20% Gain" />
        </th>
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
            <info-tooltip
              v-if="expert.period === 'Overall'"
              title="Overall rating is a mash-up of the results available on each investing horizon."
            />
          </div>
          <expert-rating
            :rating="expert.rate"
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
            {{ expert.big_lose | percentageAgainst(expert.total) | formatPercentage }}
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
            {{ expert.lose | percentageAgainst(expert.total) | formatPercentage }}
          </span>
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.no_change || 0 }}
          </a>
          <span class="expert-tp-count-percent">
            {{ expert.no_change | percentageAgainst(expert.total) | formatPercentage }}
          </span>
        </td>
        <td>
          <a
            :href="`${expert.url}?period=${expert.period}`"
            class="link-to-card"
          >
            {{ expert.win || 0 }}
          </a>
          <span class="expert-tp-count-percent">
            {{ expert.win | percentageAgainst(expert.total) | formatPercentage }}
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
            {{ expert.big_win | percentageAgainst(expert.total) | formatPercentage }}
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
  <!-- eslint-enable max-len -->
</template>

<script>
import ExpertRating from '../../ExpertRating.vue';
import InfoTooltip from './InfoTooltip';

export default {
  name: 'TopWorstExpertsTable',

  components: {
    ExpertRating,
    InfoTooltip,
  },

  props: {
    experts: {
      type: Array,
      required: true,
    },

    orderBy: {
      type: String,
      required: true,
      validator: value => ['ASC', 'DESC'].indexOf(value) !== -1,
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

  .expert-period
    display flex
    .overall-description
      width 11px
      height 11px
      background #afb5d7
      margin-left 2px
      border-radius 50%
      .info-mark
        font-size 9px
        font-style oblique
        font-weight bold
        vertical-align top
        margin-left 4px
        color white

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

  .header-column-ranking
    &:hover
      cursor pointer
    i
      margin-left 24px
</style>
