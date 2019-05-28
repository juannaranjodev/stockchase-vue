<template>
  <div class="header-container">
    <div class="header">
      <div class="header-left">
        <h2 class="title">
          Top Picks
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
    <div class="header">
      <div class="header-left">
        <per-page-control
          :pattern="`/opinions/recenttop/sort/date/page/1/direction/desc/max/:perPage`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PerPageControl from '../PerPageControl.vue';

export default {
  name: 'Header',

  components: {
    PerPageControl,
  },

  computed: {
    ...mapGetters(['shouldShowAd']),
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

.subscribe
  color black
  text-decoration underline
  font-size 15px

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
