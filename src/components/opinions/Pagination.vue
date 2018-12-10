<template>
  <div class="pgntn">
    <div
      v-if="left"
      class="pgntn-left"
    >
      <ul class="pagination pagination--relaxed">
        <li
          v-if="olderDate"
          :class="{'page-item page-item--bordered page-item--prev': true}"
        >
          <a
            :href="olderDateUrl"
            class="page-link"
          >
            <img src="~assets/svgs/arrow_down.svg">
            <span>{{ olderDate.date | formatDate('ddd') }}</span>
          </a>
        </li>

        <li :class="{'page-item page-item--bordered': true}">
          <b-dropdown toggle-class="page-link">
            <b-dropdown-item
              v-for="adjacentDate in adjacentDates"
              :key="`adjacentDate_${adjacentDate.date}`"
              :active="adjacentDate.date === date"
              :href="getDateUrl(adjacentDate.date)"
            >{{ adjacentDate.date | formatDate('dddd') }}, {{ adjacentDate.date | formatDate('LL') }}</b-dropdown-item>

            <template slot="button-content">
              <span>{{ date | formatDate('ddd[ ]MMM[/]DD') }}</span>
              <img src="~assets/svgs/arrow_down.svg">
            </template>
          </b-dropdown>
        </li>

        <li
          v-if="newerDate"
          :class="{'page-item page-item--bordered page-item--next': true}"
        >
          <a
            :href="newerDateUrl"
            class="page-link"
          >
            <span>{{ newerDate.date | formatDate('ddd') }}</span>
            <img src="~assets/svgs/arrow_down.svg">
          </a>
        </li>


      </ul>
    </div>
    <div
      v-if="right"
      class="pgntn-right"
    >
      <ul class="pagination">
        <li :class="{'page-item page-item--bordered page-item--prev': true, 'disabled': !prevPage && !newerDate}">
          <a
            v-if="prevPage || newerDate"
            :href="prevPage ? prevPageUrl : newerUrl"
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
            :href="getPaginationUrl(date, page)">{{ page }}</a>
        </li>

        <li :class="{'page-item page-item--next page-item--highlight': true, 'disabled': !nextPage && !olderDate}">
          <a
            v-if="nextPage || olderDate"
            :href="nextPage ? nextPageUrl : olderUrl"
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
    ...mapGetters([ 'date', 'adjacentDates', 'olderDate', 'newerDate', 'opinions' ]),

    newerDateUrl() {
      return this.getPaginationUrl(this.newerDate.date, 1)
    },

    olderDateUrl() {
      return this.getPaginationUrl(this.olderDate.date, 1)
    },

    newerUrl() {
      const numPages = Math.ceil(this.newerDate.count / c.PER_PAGE)
      return this.getPaginationUrl(this.newerDate.date, numPages)
    },

    olderUrl() { return this.olderDateUrl },

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
      return this.getPaginationUrl(this.date, this.prevPage)
    },

    nextPage() {
      if (this.currentPage < this.numPages) return this.currentPage + 1
    },

    nextPageUrl() {
      return this.getPaginationUrl(this.date, this.nextPage)
    },
  },

  methods: {
    getPaginationUrl(date, page) {
      return this.type === 'opinions'
        ? `/opinions/${date}/${page}`
        : `/opinions/market/${date}/${page}`
    },

    getDateUrl(date) {
      return this.getPaginationUrl(date, 1)
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

    &:only-child
      margin 0

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

      .page-link
        span + img
          margin-left 7px

        img + span
          margin-left 7px

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
        &:not(&--highlight)
          .page-link
            & > *
              opacity 0.6

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

@media (max-width 767px)
  .pgntn
    &-left, &-right
      margin 0
      display flex
      width 100%
      justify-content center
    .pagination
      justify-content center

</style>
