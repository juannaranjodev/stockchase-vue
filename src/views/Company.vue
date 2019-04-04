<template>
  <div class="company-container">
    <div class="container">
      <h1>this is company view page for {{ company.name }} ({{ company.symbol }}), {{ numOpinionPages }} opinion pages, {{ perPage }} per page, page #{{ page }}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stripTags } from '../util/filters'

export default {
  name: 'Company',

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_COMPANY', {
      id: route.params.id,
      symbol: route.params.symbol,
      page: +route.params.page,
      perPage: +route.params.perPage,
    })
  },

  title () {
    return `${this.title} Stock Predictions`
  },

  previewTitle () {
    return this.title
  },

  image () {
    return this.company.logo
  },

  description () {
    const latestOpinion = this.opinions[0]

    if (latestOpinion) return stripTags(latestOpinion.comment)
  },

  computed: {
    ...mapGetters([ 'company', 'opinions', 'numOpinionPages' ]),

    title() {
      return `${this.company.name} (${this.company.symbol})`
    },

    page () {
      return +this.$route.params.page || 1
    },

    perPage () {
      return +this.$route.params.perPage || 15
    }
  },
}
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

h1
  color green

@media (max-width 991px)
  .container
    padding 0 10px

</style>
