<template>
  <!-- eslint-disable max-len -->
  <div
    v-if="shouldShowTopAndWorstExperts"
    class="container"
  >
    <div class="top-worst-experts-container-title">
      Top & Worst Experts - {{ new Date() | formatDate('MMMM YYYY') }}<a href="#disclaimer">*</a>
    </div>
    <div class="top-worst-experts-container-subtitle">
      <strong>Premium Exclusive</strong><br>
      Here are the Top 25 and Other stock experts ranking according to Top Picks performance so far. We analyzed the performance of the expert's top picks as if they were bought on the date the expert chose it as a Top Pick and sold at the end of the chosen investing horizon. Ratings are updated weekly.
    </div>
    <top-worst-experts-tab-list
      :tab="selectedTab"
      :sort-by="sortBy"
      @changeTab="changeTab"
      @changeSortBy="changeSortBy"
    />
    <top-worst-expert-table
      :experts="sortedExperts"
      :order-by="orderBy"
      @toggleOrderBy="toggleOrderBy"
    />
    <div
      id="disclaimer"
      class="top-worst-experts-container-disclaimer"
    >
      * The Expert Ratings are based on analysis of the data collected
      by the Stockchase editor team and might not be 100% accurate.
      The Expert Ratings are not an indicator of future actual results.
      This information is provided for illustrative purposes only.
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script>
import { mapGetters } from 'vuex';
import TopWorstExpertsTabList from '../components/Experts/TopWorst/TopWorstExpertsTabList.vue';
import TopWorstExpertTable from '../components/Experts/TopWorst/TopWorstExpertsTable.vue';

export default {
  name: 'TopWorstExpertList',

  components: {
    TopWorstExpertsTabList,
    TopWorstExpertTable,
  },

  data() {
    return {
      selectedTab: 'top', // Or 'worst',
      sortBy: 'Overall', // Or '1 Month', '6 Months', '12 Months', '2 Years', '5 Years',
      orderBy: 'ASC', // Or 'DESC',
    };
  },

  computed: {
    ...mapGetters(['shouldShowTopAndWorstExperts', 'user', 'topExperts', 'worstExperts']),

    otherExperts() {
      return this.worstExperts
        .filter(expert => !this.topExperts
          .find(e => e.expert_id === expert.expert_id));
    },

    experts() {
      return this.selectedTab === 'top' ? this.topExperts : this.otherExperts;
    },

    sortedExperts() {
      const sortedExperts = [];
      const expertsById = {};
      let beforeExpertId = null;
      let periodRate = 0;
      let indices = [];
      const sortedExpertIds = [];
      let idx;
      for (idx = 0; idx < this.experts.length; idx += 1) {
        const {
          expert_id: expertId, name, period, rate,
        } = this.experts[idx];
        if (beforeExpertId !== expertId) {
          if (beforeExpertId) {
            expertsById[beforeExpertId] = { indices, periodRate, name };
            sortedExpertIds.push(beforeExpertId);
          }
          beforeExpertId = expertId;
          indices = [];
          periodRate = 0;
        }
        indices.push(idx);

        if (period === this.sortBy) {
          periodRate = rate;
        }
      }
      expertsById[beforeExpertId] = { indices, periodRate, name: this.experts[idx - 1].name };
      sortedExpertIds.push(beforeExpertId);

      sortedExpertIds.sort((a, b) => {
        if (expertsById[a].periodRate === expertsById[b].periodRate) {
          return expertsById[a].name.toLowerCase() < expertsById[b].name.toLowerCase() ? -1 : 1;
        }

        return expertsById[a].periodRate - expertsById[b].periodRate;
      });

      if (this.orderBy === 'DESC') {
        sortedExpertIds.reverse();
      }

      sortedExpertIds.forEach((id) => {
        expertsById[id].indices.forEach((index) => {
          sortedExperts.push(this.experts[index]);
        });
      });

      return sortedExperts;
    },
  },

  watch: {
    user(user) {
      if (!user.admin && !user.premium) {
        window.location.href = '/';
      }
    },
  },

  asyncData({ store }) {
    return Promise.all([
      store.dispatch('FETCH_TOP_OR_WORST_EXPERTS', true),
      store.dispatch('FETCH_TOP_OR_WORST_EXPERTS', false),
    ]);
  },

  methods: {
    changeTab(tab) {
      this.selectedTab = tab;
    },

    changeSortBy(value) {
      this.sortBy = value;
    },

    toggleOrderBy() {
      this.orderBy = this.orderBy === 'ASC' ? 'DESC' : 'ASC';
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto

  .top-worst-experts-container-title
    font-size: 44px
    color: #2B3440
    text-align: center
    padding: 2rem

  .top-worst-experts-container-subtitle
    font-size: 16px
    text-align: center
    margin-top: -16px
    margin-bottom: 32px

  .top-worst-experts-container-disclaimer
    font-size: 16px
    margin-top: 24px
    margin-bottom: 24px
</style>
