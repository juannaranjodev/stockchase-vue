<template>
  <div class="header-container">
    <div class="header">
      <div class="header-left">
        <h2 class="title">
          What the experts are saying about {{ company.symbol }}
        </h2>
      </div>
    </div>
    <div class="header">
      <div class="header-left">
        <div class="per-page-controls">
          <div class="per-page-controls-label">
            Show
          </div>
          <div
            v-for="num in perPageOptions"
            :key="num"
            class="per-page-controls-button"
          >
            <span v-if="num === perPage">{{ num }}</span>
            <a
              v-else
              :href="getUrl(num)"
            >{{ num }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',

  data() {
    return {
      perPageOptions: [15, 30, 60, 120],
    };
  },

  computed: {
    ...mapGetters(['company']),

    perPage() {
      return +this.$route.params.perPage || 15;
    },
  },

  methods: {
    getUrl(perPage) {
      return `/company/view/${this.company.id}/sort/date/page/1/direction/desc/max/${perPage}`;
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between
  border-bottom 2px solid #E9E9EA
  padding 5px 0
  min-height 59px

  &-container
    margin-bottom 15px

  &-left
    display flex
    align-items center
    flex-wrap wrap

.title
  font-size 2em
  color #111
  line-height 1.1
  margin-bottom 0
  text-align center

.per-page-controls
  display flex
  align-items center
  flex-wrap wrap

  &-label
    font-weight bold
    color black
    margin-right 5px

  &-button
    margin 0 5px
    line-height normal

    a, span
      display block
      padding 2px 5px

    a
      color black
      text-decoration none

      &:hover
        color #FF4135

    span
      color white
      background-color #FF4135
      border-radius 5px

@media (max-width 991px)
  .header
    border-bottom 0
    padding-bottom 0
    min-height 0
    padding-top 15px

    &-left
      justify-content center
      flex-direction column
      align-items center
      width 100%

  .title
    font-size 1.6em

</style>
