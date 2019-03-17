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
          v-for="(expert, index) in getFirstExpertRow"
          :key="index"
          :expert="true"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="expert.title + ' at ' + expert.company"
          :footnote="expert.total_opinion + ' opinions'"
          :social-links="expert.social_links"
        />
      </div>
      <!-- ad here -->
      <div>Test ad</div>
      <div class="second-row">
        <card-view
          v-for="(expert, index) in getTheRestOfExperts"
          :key="index"
          :expert="true"
          image-size="small"
          :image-src="expert.avatar"
          :name="expert.name"
          :title="expert.name"
          :sub-title="expert.title + ' at ' + expert.company"
          :footnote="expert.total_opinion + ' opinions'"
          :social-links="expert.social_links"
        />
      </div>
    </div>
    <paginator
      :current-page="getCurrentPage"
      :total-items="getTotalExperts"
    />
  </div>
</template>

<script>
import * as c from '../constants'

import CardView from '../components/CardView.vue'
import CardsViewFilters from '../components/CardsViewFilters.vue'
import Paginator from '../components/Paginator.vue'
import { mapGetters } from 'vuex';

const dummy = { // I'll just use this until I fully understand Store:actions, getters, mutations
  experts: [
    {
      id:1305, // as the key
      name:"Lorne Steinberg",
      TITLE:"President & Portfolio Manager",
      COMPANY:"Lorne Steinberg Wealth Management Inc",
      total_opinion:704,
      avatar:"experts/1305/steinberg-lorne.png",
      social_links: { // this is only for sample purposes. data could be of different structure
        facebook: 'https://www.facebook.com',
      }
    },
    {
      id:1392, // as the key
      name:"Brian Madden",
      TITLE:"Senior VP & Portfolio Manager",
      COMPANY:"Goodreid Investment Council",
      total_opinion:323,
      avatar:"experts/1392/madden-brian-madden.png",
    },
  ],
};

export default {
  name: 'Experts',
  
  serverCacheKey: () => {
    return `experts::container`
  },
  data: () => {
    return {
      title: 'Stock Experts',
      searchPlaceholder: 'Filter by expert name',
    }
  },
  components: {
    CardsViewFilters,
    CardView,
    Paginator
  },

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_EXPERTS', {
      page: 1
    })
  },

  computed: {
    ...mapGetters(['experts']),

    getCurrentPage(){
      return 1
    },

    getFirstExpertRow() {
      return this.experts.rows.length < 5 ? this.experts.rows : this.experts.rows.slice(0, 5)
    },
    getTheRestOfExperts() {
      return this.experts.rows.length >= 5 ? this.experts.rows.slice(5) : []
    },
    getTotalExperts(){
      return this.experts.count
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
