<template>
  <div class="container">
    <cards-view-filters 
      :title="title" 
      :search-placeholder="searchPlaceholder"
      target-search="experts"
    />
    <div class="experts">
      <div class="first-row">
        <card-view 
          v-for="(expert, index) in firstFiveExperts"
          :key="index"
          :expert="true"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="expert.title + ' at ' + expert.company"
          :footnote="expert.total_opinion + ' opinions'"
          :social-links="expert.social_links"
          :card-link="expert.url"
        />
      </div>
      <!-- ad here -->
      <div>Test ad</div>
      <div class="second-row">
        <card-view
          v-for="(expert, index) in theRestOfExperts"
          :key="index"
          :expert="true"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="expert.title + ' at ' + expert.company"
          :footnote="expert.total_opinion + ' opinions'"
          :social-links="expert.social_links"
          :card-link="expert.url"
        />
      </div>
    </div>
    <paginator
      :type="paginator.type"
      :sort="paginator.sort"
      :direction="paginator.direction"
      :total-items="totalExperts"
      :main="'/expert'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
    />
  </div>
</template>

<script>
import * as c from '../constants'

import CardView from '../components/CardView.vue'
import CardsViewFilters from '../components/CardsViewFilters.vue'
import Paginator from '../components/Paginator.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Experts',
  
  // serverCacheKey: () => { // spent hours fixing on why the pagination keeps on pointing on the wrong page, this turns out to be the culprit. arg....
  //   return `experts::container`
  // },
  data(){
    return {
      title: 'Stock Experts',
      searchPlaceholder: 'Filter by expert name',
      paginator: {
        type: this.$route.params.type ? this.$route.params.type : 'F',
        sort: this.$route.params.sort ? this.$route.params.sort : 'FirstName',
        direction: this.$route.params.direction ? this.$route.params.direction : 'desc',
      },
    }
  },
  components: {
    CardsViewFilters,
    CardView,
    Paginator
  },

  asyncData ({ store, route }) {
    const { params } = route;

    return Promise.all([
      store.dispatch('FETCH_EXPERTS', {
        page: params.page ?  parseInt(params.page) : 1,
        limit: params.itemsPerPage ? parseInt(params.itemsPerPage) : 15,
      }),
      store.dispatch('FETCH_TOTAL_EXPERTS')
    ])
  },

  computed: {
    ...mapGetters(['experts', 'totalExperts']),

    firstFiveExperts() {
      return this.experts.length < 5 ? this.experts : this.experts.slice(0, 5)
    },
    theRestOfExperts() {
      return this.experts.length >= 5 ? this.experts.slice(5) : []
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
