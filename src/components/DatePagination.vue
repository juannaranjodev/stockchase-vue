<template>
  <div :class="{ 'pgntn': true, 'pgntn--bottom': bottom }">
    <div :class="{ 'pgntn-left': true, 'd-none d-lg-block': bottom }">
      <ul class="pagination">
        <li class="page-item page-item--bordered">
          <b-dropdown
            class="date-pagination-dropdown"
            toggle-class="page-link"
          >
            <b-dropdown-item
              v-for="adjacentDate in adjacentDates"
              :key="`adjacentDate_${adjacentDate.date}`"
              :active="adjacentDate.date === date"
              :href="getDateUrl(adjacentDate.date)"
            >
              {{ adjacentDate.date | formatFullDate }}
            </b-dropdown-item>
            <b-dropdown-item
              :key="`adjacentDate_more_${lastAdjacentDate.date}`"
              :href="getDateUrl(lastAdjacentDate.date)"
            >
              More...
            </b-dropdown-item>

            <template slot="button-content">
              <span>{{ date | formatFullDate }}</span>
              <img src="~assets/svgs/arrow_down.svg">
            </template>
          </b-dropdown>
        </li>
        <li
          v-if="top && !adFree"
          class="page-item page-item--plain d-none d-lg-block"
        >
          <span>Page {{ currentPage }}/{{ numPages }}</span>
        </li>
      </ul>
    </div>

    <div class="pgntn-right">
      <ul
        v-if="bottom"
        class="pagination"
      >
        <li
          :class="{
            'page-item page-item--prev page-item--bordered': true,
            'disabled': !prevPage && !newerDate,
          }"
        >
          <a
            v-if="prevPage || newerDate"
            :href="prevPage ? prevPageUrl : newerUrl"
            class="page-link"
          ><img src="~assets/svgs/arrow_down.svg"></a>
          <span
            v-else
            class="page-link"
          ><img src="~assets/svgs/arrow_down.svg"></span>
        </li>

        <li
          v-for="page in numPages"
          :key="`page_${page}`"
          :class="{ 'page-item page-item--number': true, active: page === currentPage }"
        >
          <span
            v-if="page === currentPage"
            class="page-link"
          >{{ page }}</span>
          <a
            v-else
            class="page-link"
            :href="getPaginationUrl(date, page)"
          >{{ page }}</a>
        </li>

        <li
          :class="{
            'page-item page-item--next page-item--highlight': true,
            'disabled': !nextPage && !olderDate,
          }"
        >
          <a
            v-if="nextPage || olderDate"
            :href="nextPage ? nextPageUrl : olderUrl"
            class="page-link"
          ><span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg"></a>
          <span
            v-else
            class="page-link"
          ><span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg"></span>
        </li>
      </ul>
      <ul
        v-else
        class="pagination"
      >
        <li
          :class="{
            'page-item page-item--next page-item--highlight': true,
            'disabled': !nextPage && !olderDate,
          }"
        >
          <a
            v-if="nextPage || olderDate"
            :href="nextPage ? nextPageUrl : olderUrl"
            class="page-link"
          ><span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg"></a>
          <span
            v-else
            class="page-link"
          ><span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import * as c from '../constants';

export default {
  name: 'DatePagination',

  filters: {
    formatFullDate(val) {
      return `${moment(val).format('dddd')}, ${moment(val).format('LL')}`;
    },

    formatWeekday(val) {
      return `${moment(val).format('dddd')}`;
    },
  },

  props: {
    numDateItems: {
      type: Number,
      default: 1,
    },
    top: {
      type: Boolean,
    },
    bottom: {
      type: Boolean,
    },
    urlPattern: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters(['date', 'adjacentDates', 'olderDate', 'newerDate', 'adFree']),

    newerDateUrl() {
      return this.getPaginationUrl(this.newerDate.date, 1);
    },

    olderDateUrl() {
      return this.getPaginationUrl(this.olderDate.date, 1);
    },

    newerUrl() {
      const numPages = Math.ceil(this.newerDate.count / c.PER_PAGE);
      return this.getPaginationUrl(this.newerDate.date, numPages);
    },

    olderUrl() { return this.olderDateUrl; },

    numPages() {
      return this.adFree ? 0 : Math.ceil(this.numDateItems / c.PER_PAGE);
    },

    currentPage() {
      return Number(this.$route.params.page) || 1;
    },

    prevPage() {
      return (this.currentPage > 1) ? this.currentPage - 1 : null;
    },

    prevPageUrl() {
      if (this.adFree) return this.newerDateUrl;
      return this.getPaginationUrl(this.date, this.prevPage);
    },

    nextPage() {
      return (this.currentPage < this.numPages) ? this.currentPage + 1 : null;
    },

    nextPageUrl() {
      if (this.adFree) return this.olderDateUrl;
      return this.getPaginationUrl(this.date, this.nextPage);
    },

    lastAdjacentDate() {
      return this.adjacentDates[this.adjacentDates.length - 1];
    },
  },

  methods: {
    getPaginationUrl(date, page) {
      let url = this.urlPattern.replace(':date', date);

      if (!this.adFree) url = `${url}/${page}`;

      return url;
    },

    getDateUrl(date) {
      return this.getPaginationUrl(date, 1);
    },
  },
};
</script>

<style lang="stylus">
.date-pagination-dropdown .dropdown-menu
  transition none
</style>

<style lang="stylus" scoped>
.pgntn
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between

  &-left, &-right
    margin 10px 0

    &:only-child
      margin 0
      width 100%

  &-left
    margin-right 10px

  .pagination
    display flex
    align-items center
    flex-wrap wrap
    justify-content space-between
    margin 10px 0

    >>> .page-link
      color #25292B !important
      font-size 14px
      font-weight bold
      display flex
      align-items center
      justify-content center
      height 36px
      min-width 36px
      border-radius 3px
      margin 3px 1px
      outline 0
      border 0
      z-index 0 !important
      position inherit

      &:after
        display none

    .page-item
      img
        margin-top 2px

      >>> .page-link
        span + img
          margin-left 7px

        img + span
          margin-left 7px

      &--number
        >>> .page-link
          height 30px
          min-width 30px

      &--number, &--highlight
        >>> .page-link
          border 0

      &--bordered
        >>> .page-link
          width fit-content
          border 1px solid #dee2e6 !important
          box-shadow 0 1px 3px rgba(black, 0.1) !important

      &--plain
        margin-left 20px
        color #79739b

      &--prev
        img
          transform rotate(90deg)

      &--next
        img
          transform rotate(-90deg)

      &--highlight
        >>> .page-link
          background-color #ec4d4b
          border-color #ec4d4b
          color white !important

          &:hover
            background-color lighten(#ec4d4b, 5%)
            border-color lighten(#ec4d4b, 5%)

      &.active
        >>> .page-link
          background-color #ec4d4b
          border-color #ec4d4b
          color white !important
          &:hover
            cursor inherit

      .show
        >>> .page-link
          background-color rgba(black, 0.1) !important
        .dropdown-item
          font-size 14px
          outline 0

          &.active
            background-color rgba(black, 0.1)
            font-weight bold
            color #212529

      &.disabled
        >>> .page-link
          opacity 0.3

@media (max-width 991px)
  .pgntn
    &-left, &-right
      .pgntn--bottom &
        margin 0
        display flex
        width 100%
        justify-content center

    &--bottom .pagination
      justify-content center

</style>
