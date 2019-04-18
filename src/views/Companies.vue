<template>
  <div class="container">
    <cards-view-filters
      :title="title"
      :search-placeholder="searchPlaceholder"
      target-search="companies"
      :reset-uri="'/company'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
    />
    <div class="companies">
      <div class="first-row">
        <!-- <card-view
          v-for="(expert, index) in firstFiveCompanies"
          :key="index"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="`${expert.title} at ${expert.company}`"
          :footnote="`${expert.total_opinion} opinions`"
          :social-links="expert.social_links || {}"
          :card-link="expert.url"
        /> -->
      </div>

      <in-feed-ad />

      <div class="second-row">
        <!-- <card-view
          v-for="(expert, index) in theRestOfCompanies"
          :key="index"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="`${expert.title} at ${expert.company}`"
          :footnote="`${expert.total_opinion} opinions`"
          :social-links="expert.social_links || {}"
          :card-link="expert.url"
        /> -->
      </div>
    </div>
    <!-- <paginator
      :type="paginator.type"
      :sort="paginator.sort"
      :direction="paginator.direction"
      :total-items="totalExperts"
      :items-per-page="paginator.itemsPerPage"
      :main="'/company'"
      :pattern="'/index/all/:type/sort/:sort/page/:page/direction/:direction/max/:itemsPerPage'"
    /> -->
  </div>
</template>

<script>
import * as c from '../constants'

import CardView from '../components/CardView.vue'
import CardsViewFilters from '../components/CardsViewFilters.vue'
import Paginator from '../components/Paginator.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Companies',

  components: {
    CardsViewFilters,
    //CardView,
    //Paginator
  },

  data(){
    const { params } = this.$route;

    return {
      title: 'Public Companies',
      searchPlaceholder: 'Filter by name or symbol',
      paginator: {
        type: params.type ? params.type : 'C',
        sort: params.sort ? params.sort : 'name',
        direction: params.direction ? params.direction : 'desc',
        itemsPerPage: params.itemsPerPage ? params.itemsPerPage : 15
      },
    }
  },

  computed: {
    //...mapGetters(['experts', 'totalExperts']),

    firstFiveCompanies() {
      return [];
      //return this.experts.length < 5 ? this.experts : this.experts.slice(0, 5)
    },
    theRestOfCompanies() {
      return [];
      //return this.experts.length >= 5 ? this.experts.slice(5) : []
    },
  },

  // asyncData ({ store, route }) {
  //   const { params, query } = route;
  //   const { page, itemsPerPage, character, type } = params;

  //   let promises = null;

  //   if (Object.keys(query).length > 0) { // if doing a search query
  //     promises = [
  //       store.dispatch('FETCH_EXPERTS_BY_NAME', {
  //         term: decodeURI(query.search),
  //         page: page ?  parseInt(page) : 1,
  //         limit: itemsPerPage ? parseInt(itemsPerPage) : 15,
  //       }),
  //       store.dispatch('FETCH_TOTAL_EXPERTS', { term: decodeURI(query.search) }),
  //     ]
  //   } else if (character) {
  //     promises = [
  //       store.dispatch('FETCH_EXPERTS_BY_CHARACTER', {
  //         character: character,
  //         type: type,
  //         page: page ?  parseInt(page) : 1,
  //         limit: itemsPerPage ? parseInt(itemsPerPage) : 15,
  //       }),
  //       store.dispatch('FETCH_EXPERTS_TOTAL_BY_CHARACTER', {
  //         character: character,
  //         type: type,
  //       })
  //     ]
  //   } else {
  //     promises = [
  //       store.dispatch('FETCH_EXPERTS', {
  //         page: page ?  parseInt(page) : 1,
  //         limit: itemsPerPage ? parseInt(itemsPerPage) : 15,
  //       }),
  //       store.dispatch('FETCH_TOTAL_EXPERTS', { term: null }),
  //     ]
  //   }

  //   return promises ? Promise.all(promises) : null
  // },
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
