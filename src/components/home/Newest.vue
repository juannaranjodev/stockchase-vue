<template>
  <div class="newest">
    <div class="newest-section">
      <h3 class="newest-section__title">Newest Companies</h3>
      <div class="newest-section__links">
        <a
          v-for="company in newestCompanies"
          :key="company.id"
          :href="company.url"
          class="newest-section__link"
        >
          <strong>{{ company.symbol }}</strong>
          <span>, {{ company.name }}</span>
        </a>
      </div>
      <hr class="home-divider">
    </div>

    <div class="newest-section">
      <h3 class="newest-section__title">Newest Expert</h3>
      <div class="newest-section__links">
        <a
          v-for="expert in newestExperts"
          :key="expert.id"
          :href="expert.url"
          class="newest-section__link"
        >
          <strong>{{ expert.name }}</strong>
          <span>, {{ expert.title }}</span>
        </a>
      </div>
      <hr class="home-divider">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeNewest',

  computed: {
    ...mapGetters([ 'newestExperts', 'newestCompanies' ]),
  },
}
</script>

<style lang="stylus" scoped>
.newest
  &-section
    margin-bottom 25px

    &__title
      color #FF2E50
      font-weight bold
      font-size 13px
      margin-bottom 25px
      text-transform uppercase

    &__link
      display block
      font-size 1.1em
      color black
      text-decoration none
      line-height 1.4em
      margin-bottom .6em
      white-space nowrap
      overflow hidden
      text-overflow ellipsis

</style>
