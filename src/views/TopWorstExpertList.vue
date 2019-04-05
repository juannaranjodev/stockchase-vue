<template>
  <div class="container">
    <div class="top-worst-experts-container-title">
      Stock Experts Top Picks Portfolios Ratings
    </div>
    <top-worst-experts-tab-list
      :tab="selectedTab"
      @changeTab="changeTab"
    />
    <top-worst-expert-table :experts="experts"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopWorstExpertsTabList from '../components/experts/top-worst/TopWorstExpertsTabList'
import TopWorstExpertTable from '../components/experts/top-worst/TopWorstExpertsTable'

export default {
  name: 'TopWorstExpertList',

  components: {
    TopWorstExpertsTabList,
    TopWorstExpertTable,
  },

  data() {
    return {
      selectedTab: 'top', // Or 'worst',
    }
  },

  computed: {
    ...mapGetters([ 'topExperts', 'worstExperts' ] ),

    experts() {
      return this.selectedTab === 'top' ? this.topExperts: this.worstExperts
    }
  },

  methods: {
    changeTab(tab) {
      this.selectedTab = tab
    },
  },

  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('FETCH_TOP_OR_WORST_EXPERTS', true),
      store.dispatch('FETCH_TOP_OR_WORST_EXPERTS', false),
    ])
  },
}
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
</style>