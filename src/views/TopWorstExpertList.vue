<template>
  <div
    v-if="shouldShowTopAndWorstExperts"
    class="container"
  >
    <div class="top-worst-experts-container-title">
      Top & Worst Experts - {{ new Date() | formatDate('MMMM YYYY') }}<a href="#disclaimer">*</a>
    </div>
    <div class="top-worst-experts-container-subtitle">
      <strong>Premium Exclusive</strong><br>
      Here are the Top 25 and Worst 25 stock experts according to Top Picks performance so far.
      We analyzed the performance of the expert's top picks as if they were bought on the date
      the expert chose it as a Top Pick and sold according to the chosen investing horizon.
      Ratings are updated weekly.
    </div>
    <top-worst-experts-tab-list
      :tab="selectedTab"
      @changeTab="changeTab"
    />
    <top-worst-expert-table :experts="experts" />
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
    };
  },

  computed: {
    ...mapGetters(['shouldShowTopAndWorstExperts', 'user', 'topExperts', 'worstExperts']),

    experts() {
      return this.selectedTab === 'top' ? this.topExperts : this.worstExperts;
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
