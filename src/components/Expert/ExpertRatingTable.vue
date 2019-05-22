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
            >
            RATING
          </div>
          {{ expert.rating }}
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-big-win.svg"
              width="16"
            >
            BIG WIN
          </div>
          {{ totalTopPicks.bigWins }}
          <span class="percentage">
            ({{ totalTopPicks.bigWins | percentageAgainst(expert.totalWins) | formatPercentage }})
          </span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-win.svg"
              width="16"
            >
            WIN
          </div>
          {{ totalTopPicks.wins }}
          <span class="percentage">
            ({{ totalTopPicks.wins | percentageAgainst(expert.totalWins) | formatPercentage }})
          </span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-neutral.svg"
              width="16"
            >
            NEUTRAL
          </div>
          {{ totalTopPicks.noChanges }}
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-loss.svg"
              width="16"
            >
            LOSS
          </div>
          {{ totalTopPicks.loses }}
          <span class="percentage">
            ({{ totalTopPicks.loses | percentageAgainst(expert.totalLoses) | formatPercentage }})
          </span>
        </th>
        <th>
          <div class="th-description">
            <img
              src="~assets/svgs/expert-rating-big-loss.svg"
              width="16"
            >
            BIG LOSS
          </div>
          {{ totalTopPicks.bigLoses }}
          <span class="percentage">
            ({{ totalTopPicks.bigLoses | percentageAgainst(expert.totalLoses) | formatPercentage }})
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="rating in ratings"
        :key="`expert-rating-table-${expert.id}-${rating.period}`"
      >
        <td class="period-name">
          {{ rating.period }}
        </td>
        <td>
          <expert-rating
            :rating="rating.rating"
            :total-wins="rating.big_win + rating.win"
            :total-loses="rating.big_lose + rating.lose"
          />
        </td>
        <td>
          {{ rating.big_win || 0 }}
          <span class="percentage">
            ({{ rating.big_win | percentageAgainst(expert.totalWins) | formatPercentage }})
          </span>
        </td>
        <td>
          {{ rating.win || 0 }}
          <span class="percentage">
            ({{ rating.win | percentageAgainst(expert.totalWins) | formatPercentage }})
          </span>
        </td>
        <td>
          {{ rating.no_change || 0 }}
        </td>
        <td>
          {{ rating.lose || 0 }}
          <span class="percentage">
            ({{ rating.lose | percentageAgainst(expert.totalLoses) | formatPercentage }})
          </span>
        </td>
        <td>
          {{ rating.big_lose || 0 }}
          <span class="percentage">
            ({{ rating.big_lose | percentageAgainst(expert.totalLoses) | formatPercentage }})
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import ExpertRating from '../ExpertRating.vue';

export default {
  name: 'ExpertRatingTable',

  components: { ExpertRating },

  computed: {
    ...mapGetters(['expert']),

    ratings() {
      const results = [];
      ['1 Month', '6 Months', '12 Months', '2 Years', '5 Years'].forEach((period) => {
        const ratingMatched = this.expert.expertRatings.find(rating => rating.period === period);
        if (ratingMatched) {
          /* eslint-disable camelcase */
          const {
            big_win,
            win,
            big_lose,
            lose,
          } = ratingMatched;
          const periodScore = big_win + win - big_lose - lose;
          let periodRating = null;
          if (periodScore > 10) periodRating = 5;
          else if (periodScore < 11 && periodScore > 0) periodRating = 4;
          else if (periodScore > -11 && periodScore < 0) periodRating = 2;
          else if (periodScore < -11) periodRating = 3;
          else periodRating = 0;

          ratingMatched.rating = periodRating;
          results.push(ratingMatched);
        }
      });
      /* eslint-enable camelcase */
      return results;
    },
    totalTopPicks() {
      const result = {};
      /* eslint-disable camelcase */
      result.bigWins = _.sumBy(this.expert.expertRatings, ({ big_win }) => big_win);
      result.wins = _.sumBy(this.expert.expertRatings, ({ win }) => win);
      result.noChanges = _.sumBy(this.expert.expertRatings, ({ no_change }) => no_change);
      result.bigLoses = _.sumBy(this.expert.expertRatings, ({ big_lose }) => big_lose);
      result.loses = _.sumBy(this.expert.expertRatings, ({ lose }) => lose);
      /* eslint-enable camelcase */
      return result;
    },
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
