<template>
  <div class="container">
    <top-worst-experts-tab-list
      :tab="selectedTab"
      @changeTab="changeTab"
    />

    <top-worst-expert-table :experts="experts"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopWorstExpertsTabList from '../components/exports/top-worst/TopWorstExpertsTabList'
import TopWorstExpertTable from '../components/exports/top-worst/TopWorstExpertsTable'

export default {
  name: 'TopWorstExpertList',

  components: {
    TopWorstExpertsTabList,
    TopWorstExpertTable,
  },

  data() {
    return {
      selectedTab: 'top' // Or 'worst'
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
}
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto
</style>