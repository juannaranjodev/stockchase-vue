<template>
  <div class="container">
    <cards-view-filters
      :title="title"
      :search-placeholder="searchPlaceholder"
      target-search="experts"
      :reset-uri="'/expert'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
    />
    <div class="experts">
      <div class="first-row">
        <card-view
          v-for="(expert, index) in firstFiveExperts"
          :key="index"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="`${expert.title} at ${expert.company}`"
          :footnote="`${expert.total_opinion} opinions`"
          :social-links="expert.social_links || {}"
          :card-link="expert.url"
        />
      </div>
      <!-- <in-feed-ad/> -->
      <div class="second-row">
        <card-view
          v-for="(expert, index) in theRestOfExperts"
          :key="index"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="`${expert.title} at ${expert.company}`"
          :footnote="`${expert.total_opinion} opinions`"
          :social-links="expert.social_links || {}"
          :card-link="expert.url"
        />
      </div>
    </div>
    <paginator
      :type="paginator.type"
      :sort="paginator.sort"
      :direction="paginator.direction"
      :total-items="totalExperts"
      :items-per-page="this.$route.params.itemsPerPage"
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

  components: {
    CardsViewFilters,
    CardView,
    Paginator
  },

  data(){
    const { params } = this.$route;

    return {
      title: 'Stock Experts',
      searchPlaceholder: 'Filter by expert name',
      paginator: {
        type: params.type ? params.type : 'F',
        sort: params.sort ? params.sort : 'FirstName',
        direction: params.direction ? params.direction : 'desc',
      },
    }
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

  asyncData ({ store, route }) {
    const { params, query } = route;

    let promises = (Object.keys(query).length > 0) ? [
      store.dispatch('FETCH_EXPERTS_BY_NAME', {
        term: decodeURI(query.search),
        page: params.page ?  parseInt(params.page) : 1,
        limit: params.itemsPerPage ? parseInt(params.itemsPerPage) : 15,
      }),
      store.dispatch('FETCH_TOTAL_EXPERTS', { term: decodeURI(query.search) }),
    ] : [
      store.dispatch('FETCH_EXPERTS', {
        page: params.page ?  parseInt(params.page) : 1,
        limit: params.itemsPerPage ? parseInt(params.itemsPerPage) : 15,
      }),
      store.dispatch('FETCH_TOTAL_EXPERTS', { term: null }),
    ];

    return Promise.all(promises)
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
