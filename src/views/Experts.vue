<template>
  <div class="container">
    <cards-view-filters 
      :title="title" 
      :search-placeholder="searchPlaceholder"
    />
    <div class="experts">
      <card-view 
        v-for="(expert, index) in getFirstExpertRow"
        :key="index"
        :expert="true"
        image-size="small"
        :image-src="expert.avatar"
        :name="expert.name"
        :title="expert.name"
        :sub-title="expert.TITLE + ' at ' + expert.COMPANY"
        :footnote="expert.total_opinion + ' opinions'"
        :social-links="expert.social_links"
      />
      <!-- ad here -->
      <card-view
        v-for="(expert, index) in getTheRestOfExperts"
        :key="index"
        :expert="true"
        image-size="small"
        :image-src="expert.avatar"
        :name="expert.name"
        :title="expert.name"
        :sub-title="expert.TITLE + ' at ' + expert.COMPANY"
        :footnote="expert.total_opinion + ' opinions'"
        :social-links="expert.social_links"
      />
    </div>
  </div>
</template>

<script>
import * as c from '../constants'

import CardView from '../components/CardView.vue'
import CardsViewFilters from '../components/CardsViewFilters.vue'

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
    CardView
  },
  computed: {
    getFirstExpertRow: () => {
      return dummy.experts.length < 5 ? dummy.experts : dummy.experts.slice(0, 5)
    },
    getTheRestOfExperts: () => {
      return dummy.experts.length >= 5 ? dummy.experts.slice(5) : []
    },
  },
  methods: {
    expertSearch: () => {
      console.log('test')
    },
  }
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
