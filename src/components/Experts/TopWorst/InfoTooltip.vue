<template>
  <div
    v-b-tooltip.hover
    class="info-tooltip"
    :title="title"
  >
    <span class="info-mark">i</span>
  </div>
</template>

<script>
export default {
  name: 'InfoTooltip',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus" scoped>
.info-tooltip
  width 11px
  height 11px
  background #afb5d7
  margin-left 2px
  border-radius 50%
  display inline-block
  .info-mark
    font-size 9px
    font-style oblique
    font-weight bold
    vertical-align top
    margin-left 4px
    color white
</style>
