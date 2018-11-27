<template>
  <div class="pgntn">
    <div class="pgntn-left">
      <ul
        v-if="left"
        class="pagination pagination--relaxed"
      >
        <li
          v-if="newerDate"
          :class="{'page-item page-item--bordered page-item--prev': true}"
        >
          <a
            :href="newerUrl"
            class="page-link"
          >{{ newerDate | formatDate('ddd') }}</a>
        </li>

        <li :class="{'page-item page-item--bordered': true}">
          <b-dropdown toggle-class="page-link">
            <b-dropdown-item
              v-for="adjacentDate in adjacentDates"
              :key="`adjacentDate_${adjacentDate}`"
              :active="adjacentDate === date"
              :href="getDateUrl(adjacentDate)"
            >{{ adjacentDate | formatDate('ddd[ ]MMM[/]DD') }}</b-dropdown-item>

            <template slot="button-content">
              <span>{{ date | formatDate('ddd[ ]MMM[/]DD') }}</span>
              <img src="~assets/svgs/arrow_down.svg">
            </template>
          </b-dropdown>
        </li>

        <li
          v-if="olderDate"
          :class="{'page-item page-item--bordered page-item--next': true}"
        >
          <a
            :href="olderUrl"
            class="page-link"
          >{{ olderDate | formatDate('ddd') }}</a>
        </li>
      </ul>
    </div>
    <div class="pgntn-right">
      <ul
        v-if="right"
        class="pagination"
      >
        <li :class="{'page-item page-item--bordered page-item--prev': true, 'disabled': !prevPage}">
          <a
            v-if="prevPage"
            :href="prevPageUrl"
            class="page-link"><img src="~assets/svgs/arrow_down.svg"></a>
          <span
            v-else
            class="page-link"><img src="~assets/svgs/arrow_down.svg"></span>
        </li>

        <li
          v-for="page in numPages"
          :key="`page_${page}`"
          :class="{'page-item page-item--number': true, active: page === currentPage}"
        >
          <span
            v-if="page === currentPage"
            class="page-link">{{ page }}</span>
          <a
            v-else
            class="page-link"
            :href="getPageUrl(page)">{{ page }}</a>
        </li>

        <li :class="{'page-item page-item--next page-item--highlight': true, 'disabled': !nextPage}">
          <a
            v-if="nextPage"
            :href="nextPageUrl"
            class="page-link"><span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg"></a>
          <span
            v-else
            class="page-link"><span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg"></span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters } from 'vuex'
import * as c from '../../constants'

export default {
  name: 'OpinionsPagination',
  props: {
    type: {
      type: String,
      default: 'opinions'
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    ...mapGetters([ 'date', 'olderDate', 'newerDate', 'opinions' ]),

    newerUrl() {
      return this.type === 'opinions' ? `/opinions/${this.newerDate}` : `/opinions/market/${this.newerDate}`
    },

    olderUrl() {
      return this.type === 'opinions' ? `/opinions/${this.olderDate}` : `/opinions/market/${this.olderDate}`
    },

    numPages() {
      return Math.ceil(this.opinions.length / c.PER_PAGE)
    },

    currentPage() {
      return +this.$route.params.page
    },

    prevPage() {
      if (this.currentPage > 1) return this.currentPage - 1
    },

    prevPageUrl() {
      return this.getPageUrl(this.prevPage)
    },

    nextPage() {
      if (this.currentPage < this.numPages) return this.currentPage + 1
    },

    nextPageUrl() {
      return this.getPageUrl(this.nextPage)
    },

    adjacentDates() {
      // FIXME currently dates that do not have any opinions still show up in
      // the pagination. If we want otherwise, we need to get the list of
      // adjacent pages that have opinions from the DB

      // starting from today or max 3 days after the active date
      const startDiff = Math.min(3, moment().diff(moment(this.date, 'YYYY-MM-DD'), 'days'))
      // count down to older dates
      return [...Array(c.NUM_ADJACENT_PAGES)].map((_, i) => {
        return moment(this.date, 'YYYY-MM-DD').add(startDiff - i, 'day').format('YYYY-MM-DD')
      })
    }
  },

  methods: {
    getPageUrl(page) {
      const date = this.$route.params.date
      return this.type === 'opinions' ? `/opinions/${date}/${page}` : `/opinions/market/${date}/${page}`
    },

    getDateUrl(date) {
      return this.type === 'opinions' ? `/opinions/${date}/1` : `/opinions/market/${date}/1`
    },
  },
}
</script>

<style lang="stylus">
.pgntn
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between

  &-left, &-right
    margin 10px 0

  &-left
    margin-right 10px

  .pagination
    margin 10px 0
    display flex
    align-items center
    flex-wrap wrap

    .page-link
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

      span
        margin-right 7px

      &:after
        display none

    &--relaxed
      .page-link
        margin 3px 5px
      .page-item:first-child .page-link
        margin-left 0
      .page-item:last-child .page-link
        margin-right 0

    .page-item
      img
        margin-top 2px

      &--number
        .page-link
          height 30px
          min-width 30px

      &--number, &--highlight
        .page-link
          border 0

      &--bordered
        .page-link
          border 1px solid #dee2e6 !important
          box-shadow 0 1px 3px rgba(black, 0.1) !important

      &--prev
        img
          transform rotate(90deg)

      &--next
        img
          transform rotate(-90deg)

      &--prev, &--next
        .page-link
          color lighten(#25292B, 30%) !important

      &--highlight
        .page-link
          background-color #ec4d4b
          border-color #ec4d4b
          color white !important

          &:hover
            background-color lighten(#ec4d4b, 5%)
            border-color lighten(#ec4d4b, 5%)

      &.active
        .page-link
          background-color #ec4d4b
          border-color #ec4d4b
          color white !important
          &:hover
            cursor inherit

      .show
        .page-link
          background-color rgba(black, 0.1) !important
        .dropdown-item
          font-size 14px
          &.active
            background-color rgba(black, 0.1)
            font-weight bold
            color #212529

      &.disabled
        .page-link
          opacity 0.3

</style>
