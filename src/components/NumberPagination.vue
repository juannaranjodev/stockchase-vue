<template>
  <div
    v-if="numTotalItems > 0"
    class="pgntn-container"
  >
    <div class="pgntn-count">
      Showing {{ startPosition | round }} to {{ endPosition | round }}
      of {{ numTotalItems | round }} entries
    </div>

    <div class="pgntn">
      <div class="pgntn-left">
        <a
          v-if="prevPageUrl"
          :href="prevPageUrl"
          class="page-link page-link--highlight page-link--prev"
        >
          <img src="~assets/svgs/arrow_down_white.svg"><span>Previous</span>
        </a>
      </div>

      <div class="pgntn-center">
        <ul class="pagination">
          <li :class="{ 'page-item': true, disabled: currentPage === 1 }">
            <a
              v-if="currentPage > 1"
              :href="firstPageUrl"
              class="page-link"
            >&laquo;</a>
            <span
              v-else
              class="page-link"
            >&laquo;</span>
          </li>
          <li :class="{ 'page-item': true, disabled: currentPage === 1 }">
            <a
              v-if="currentPage > 1"
              :href="prevPageUrl"
              class="page-link"
            >&lsaquo;</a>
            <span
              v-else
              class="page-link"
            >&lsaquo;</span>
          </li>

          <li
            v-for="page in pages"
            :key="page"
            :class="{ 'page-item': true, active: page === currentPage }"
          >
            <a
              v-if="page !== currentPage"
              class="page-link"
              :href="getPageUrl(page)"
            >{{ page }}</a>
            <span
              v-else
              class="page-link"
            >{{ page }}</span>
          </li>

          <li :class="{ 'page-item': true, disabled: currentPage === numTotalPages }">
            <a
              v-if="currentPage < numTotalPages"
              :href="nextPageUrl"
              class="page-link"
            >&rsaquo;</a>
            <span
              v-else
              class="page-link"
            >&rsaquo;</span>
          </li>
          <li :class="{ 'page-item': true, disabled: currentPage === numTotalPages }">
            <a
              v-if="currentPage < numTotalPages"
              :href="lastPageUrl"
              class="page-link"
            >&raquo;</a>
            <span
              v-else
              class="page-link"
            >&raquo;</span>
          </li>
        </ul>
      </div>

      <div class="pgntn-right">
        <a
          v-if="nextPageUrl"
          :href="nextPageUrl"
          class="page-link page-link--highlight page-link--next"
        >
          <span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'NumberPagination',
  props: {
    numTotalItems: {
      type: Number,
      default: 1,
    },
    numPageItems: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 15,
    },
    search: {
      type: String,
      default: '',
    },
    urlPattern: {
      type: String,
      default: '',
    },
  },

  computed: {
    pages() {
      let firstPage = Math.max(this.currentPage - 2, 1);
      const lastPage = Math.min(firstPage + 4, this.numTotalPages);
      // Adjust first page to make sure 5 page buttons are displayed if possible
      firstPage = Math.max(lastPage - 4, 1);

      return _.map(new Array(lastPage - firstPage + 1), (page, index) => firstPage + index);
    },

    prevPage() {
      return this.currentPage - 1;
    },

    nextPage() {
      return this.currentPage + 1;
    },

    firstPageUrl() {
      return this.getPageUrl(1);
    },

    lastPageUrl() {
      return this.getPageUrl(this.numTotalPages);
    },

    prevPageUrl() {
      return (this.prevPage > 0) ? this.getPageUrl(this.prevPage) : null;
    },

    nextPageUrl() {
      return (this.nextPage <= this.numTotalPages) ? this.getPageUrl(this.nextPage) : null;
    },

    numTotalPages() {
      return Math.ceil(this.numTotalItems / this.perPage);
    },

    startPosition() {
      return (this.currentPage - 1) * this.perPage + 1;
    },

    endPosition() {
      return this.startPosition + this.numPageItems - 1;
    },
  },

  methods: {
    getPageUrl(page) {
      const url = this.urlPattern.replace(':page', page);
      return this.search ? `${url}?search=${this.search}` : url;
    },
  },
};
</script>

<style lang="stylus" scoped>
.pgntn
  display flex
  align-items center
  flex-wrap wrap
  justify-content space-between

  &-left, &-right
    margin 10px 0

  &-center
    margin 10px

  &-count
    color black
    margin 5px 0

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

    img
      margin-top 2px

    span + img
      margin-left 7px

    img + span
      margin-left 7px

    &:after
      display none

    &--highlight
      background-color #ec4d4b
      border-color #ec4d4b
      color white !important

      &:hover
        background-color lighten(#ec4d4b, 5%)
        border-color lighten(#ec4d4b, 5%)

    &--prev
      img
        transform rotate(90deg)

    &--next
      img
        transform rotate(-90deg)

  .pagination
    display flex
    align-items center
    flex-wrap wrap
    justify-content space-between
    margin 10px 0

  .page-item
    &.active
      >>> .page-link
        background-color #ec4d4b
        border-color #ec4d4b
        color white !important
        &:hover
          cursor inherit

    &.disabled
      >>> .page-link
        opacity 0.3

.btn-navigate
  background-color #ec4d4b
  border-radius 5px
  padding 7px 10px
  color white
  display inline-flex
  align-items center
  text-decoration none
  white-space nowrap

  img
    &:first-child
      margin-right 3px
    &:last-child
      margin-left 3px

@media (max-width 767px)
  .pgntn
    flex-direction column
    align-items center

</style>
