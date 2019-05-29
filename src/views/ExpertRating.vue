<template>
  <div class="expert-rating-container">
    <div class="container">
      <div class="overview">
        <div class="overview-section">
          <div class="overview-section__left">
            <div class="overview-section__block">
              <expert-rating-overview />
            </div>
          </div>

          <div class="overview-section__right">
            <expert-rating-table
              :period="selectedPeriod"
              @changePeriod="changePeriod"
            />
          </div>
        </div>

        <expert-top-picks-table
          :period="selectedPeriod"
          :top-picks="topPicksForSelectedPeriod"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import { modelPeriodName } from '../util/filters';

import ExpertRatingOverview from '../components/Expert/ExpertRatingOverview.vue';
import ExpertRatingTable from '../components/Expert/ExpertRatingTable.vue';
import ExpertTopPicksTable from '../components/Expert/ExpertTopPicksTable.vue';

export default {
  name: 'ExpertRating',

  components: {
    ExpertRatingOverview,
    ExpertRatingTable,
    ExpertTopPicksTable,
  },

  data() {
    return {
      selectedPeriod: 'one_month', // 'six_months', 'one_year', 'two_years', 'five_years'
    };
  },

  computed: {
    ...mapGetters(['expert', 'expertTopPicksHavingPerformance']),

    topPicksForSelectedPeriod() {
      return _.filter(
        this.expertTopPicksHavingPerformance,
        topPick => topPick.TopPickPerformance[this.selectedPeriod] !== null,
      );
    },
  },

  asyncData({ store, route }) {
    return store.dispatch('FETCH_EXPERT', {
      id: route.params.id,
      name: route.params.name,
      page: +route.params.page,
      perPage: +route.params.perPage,
    });
  },

  methods: {
    changePeriod(period) {
      this.selectedPeriod = modelPeriodName(period);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .container
    box-sizing border-box
    width 1140px
    max-width 100%
    padding 0 20px
    margin 0 auto

  .overview
    &-section
      margin-bottom 30px
      margin-top 30px
      display flex
      align-items stretch
      flex-wrap nowrap
      justify-content space-between

      &__left, &__right
        display flex
        align-items stretch

      &__left
        flex 1
        flex-grow 1
        flex-shrink 1

      &__right
        width 60%
        margin-left 10px
        flex-grow 0
        flex-shrink 0

      &__block
        width 100%
        padding 15px
        border-radius 5px
        box-shadow 0 4px 14px rgba(black, 0.14)

  @media (max-width 991px)
    .container
      padding 0 10px

    .overview
      &-section
        display block
        &__left, &__right
          width 100%
          margin 0

        &__left
          margin-bottom 30px

        &__block
          margin-bottom 0
</style>
