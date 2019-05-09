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
          <div
            v-if="chartEnabled"
            class="opinions-table__th opinions-table__th--chart"
          >
            <span>Chart</span>
          </div>
        </div>
      </div>
      <div class="opinions-table__tbody">
        <item
          v-for="item in displayedItems"
          :key="item.id"
          :item="item"
          :chart-enabled="chartEnabled"
          @showComments="showComments"
        />
      </div>
    </div>

    <comments-modal ref="commentsModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import moment from 'moment';
import Item from './Item.vue';
import CommentsModal from './CommentsModal.vue';

export default {
  name: 'List',

  components: {
    Item,
    CommentsModal,
  },

  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
    chartEnabled: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters(['shouldShowAd']),

    displayedItems() {
      const displayedItems = _.sortBy(this.items, [
        o => -moment(o.date, 'YYYY-MM-DD').valueOf(),
        o => o.id,
      ]);

      if (this.shouldShowAd) displayedItems.splice(1, 0, { ad: true });

      return displayedItems;
    },
  },

  methods: {
    showComments(id) {
      this.$refs.commentsModal.setupComments(id);
      this.$root.$emit('bv::show::modal', 'modal_comments');
    },
  },
};
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

    &--chart
      width 200px
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
