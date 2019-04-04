<template>
  <div class="company-container">
    <div class="container">
      <h1>this is company view page for {{ company.name }} ({{ company.symbol }})</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Company',

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_COMPANY', {
      id: route.params.id,
      symbol: route.params.symbol
    })
  },

  title () {
    return `${this.company.name} (${this.company.symbol}) Stock Predictions`
  },

  computed: {
    ...mapGetters([ 'company' ]),
  }
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
