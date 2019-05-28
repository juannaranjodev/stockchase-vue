<template>
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
</template>

<script>
export default {
  name: 'PerPageControl',

  props: {
    pattern: {
      type: String,
      default: '',
    },
    perPageOptions: {
      type: Array,
      default: () => [15, 30, 60, 120],
    },
  },

  computed: {
    perPage() {
      return Number(this.$route.params.perPage) || 15;
    },
  },

  methods: {
    getUrl(perPage) {
      return this.pattern.replace(':perPage', perPage);
    },
  },
};
</script>

<style lang="stylus" scoped>
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

</style>
