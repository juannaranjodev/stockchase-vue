<template>
  <div class="expert-overview">
    <div class="expert-logo">
      <img :src="expert.avatar">
    </div>
    <div class="expert-meta">
      <div class="expert-name">
        {{ expert.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Overview',

  computed: {
    ...mapGetters(['expert']),
  },
};
</script>

<style lang="stylus" scoped>
.expert
  &-overview
    display flex
    align-items center

  &-logo
    width 120px
    height 120px
    border-radius 5px
    margin 0 20px 0 0
    border 1px solid #ccc
    background white
    position relative
    display block

    img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      max-width 85%
      max-height 85%
      width auto
      height auto

  &-meta
    flex 1

  &-name
    font-size 23px
    color #111
    font-weight normal
    overflow hidden
    text-overflow -o-ellipsis-lastline
    text-overflow ellipsis
    /* autoprefixer: off */
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    max-height 3em

</style>
