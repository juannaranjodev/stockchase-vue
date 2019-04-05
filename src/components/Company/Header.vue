<template>
  <div class="header">
    <div class="header-left">
      <h2 class="title">
        What the experts are saying about {{ company.symbol }}
      </h2>
    </div>
    <div class="header-right">
      <a
        v-if="shouldShowAd"
        href="/premium"
        class="subscribe d-none d-lg-inline"
      >Too many ads? Remove ads !</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['shouldShowAd', 'company'])
  },
}
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

  &-left, &-right
    display flex
    align-items center
    flex-wrap wrap

  &-left
    margin-right 15px

  .title
    font-size 1.6em
    color #111
    line-height 1.1
    white-space nowrap
    margin-bottom 0
    margin-right 30px

  .subscribe
    color black
    text-decoration underline
    font-size 15px

@media (max-width 991px)
  .header
    border-bottom 0
    padding-top 15px
    padding-bottom 0

    &-left
      margin-right 0
      justify-content center
      flex-direction column
      align-items center
      width 100%

    .title
      margin-right 0

</style>
