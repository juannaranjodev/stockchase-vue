<template>
  <div>
    <div class="opinions-table">
      <div class="opinions-table__thead">
        <div class="opinions-table__tr">
          <div class="opinions-table__th opinions-table__th--signal">
            <span>Signal</span>
          </div>
          <div class="opinions-table__th opinions-table__th--opinion">
            <span>Opinion</span>
          </div>
          <div class="opinions-table__th opinions-table__th--expert">
            <span>Expert</span>
          </div>
        </div>
      </div>
      <div class="opinions-table__tbody">
        <item
          v-for="item in pageItems"
          :key="item.id"
          :item="item"
          :page="currentPage"
          @showComments="showComments"
        />
      </div>
    </div>

    <comments-modal ref="commentsModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as c from '../../constants'
import Item from './Item.vue'
import CommentsModal from './CommentsModal.vue'

export default {
  name: 'List',

  components: {
    Item,
    CommentsModal
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    page: {
      type: Number,
      default: 1
    },
  },

  computed: {
    ...mapGetters([ 'opinions', 'shouldShowAd', 'adFree' ]),

    pageItems() {
      if (this.adFree) return this.opinions

      const startIndex = (this.currentPage - 1) * c.PER_PAGE
      const pageItems = this.opinions.slice(startIndex, startIndex + c.PER_PAGE)
      if (this.shouldShowAd) pageItems.splice(1, 0, { ad: true })
      return pageItems
    },

    currentPage() {
      return +this.$route.params.page || 1
    },
  },

  methods: {
    showComments(id) {
      this.$refs.commentsModal.setupComments(id)
      this.$root.$emit('bv::show::modal', 'modal_comments')
    },
  },
}
</script>

<style lang="stylus" scoped>
.opinions-table
  font-size 16px
  line-height 160%
  border-top 3px solid #474747
  border-radius 0
  border-collapse collapse
  border-spacing 0
  color #444
  background #fff
  width 100%

  &__tr
    display flex
    flex-wrap nowrap

  &__th
    border 1px solid #ccc
    padding 10px
    text-align left
    border-top-width 0
    border-left-width 0

    &:first-child
      border-left-width 1px

  &__th
    background #F7F7F7
    font-weight normal

    &--signal
      width 80px
      flex-grow 0
      flex-shrink 0

    &--opinion
      width 1px
      flex-grow 1

    &--expert
      width 170px
      flex-grow 0
      flex-shrink 0

    span
      color #FF4135

@media (max-width 991px)
  .opinions-table
    width auto

    &__thead
      display none

    &__tbody
      display block
</style>