<template>
  <div class="pgntn">
    <div class="pgntn-left">
      <a
        href="#"
        class="page-link page-link--highlight page-link--prev"
      >
        <img src="~assets/svgs/arrow_down_white.svg"><span>Previous</span>
      </a>
    </div>

    <div class="pgntn-center">
      <ul class="pagination">
        <li class="page-item disabled">
          <span class="page-link">&laquo;</span>
        </li>
        <li class="page-item disabled">
          <span class="page-link">&lsaquo;</span>
        </li>

        <li
          v-for="page in pages"
          :key="page"
          :class="{ 'page-item': true, active: page === currentPage }"
        >
          <a
            v-if="page !== currentPage"
            class="page-link"
            href="#"
          >{{ page }}</a>
          <span
            v-else
            class="page-link"
          >{{ page }}</span>
        </li>

        <li class="page-item">
          <a
            href="#"
            class="page-link"
          >&rsaquo;</a>
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
          >&raquo;</a>
        </li>
      </ul>
    </div>

    <div class="pgntn-right">
      <a
        href="#"
        class="page-link page-link--highlight page-link--next"
      >
        <span>Next Page</span><img src="~assets/svgs/arrow_down_white.svg">
      </a>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'NumberPagination',
  props: {
    numTotalPages: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    },
    urlPattern: {
      type: String,
      default: ''
    },
  },

  computed: {
    pages () {
      return [1,2,3,4,5]
    }
  },
}
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
