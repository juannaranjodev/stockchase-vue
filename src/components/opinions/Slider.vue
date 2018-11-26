<template>
  <div class="slider-container d-none d-md-block">
    <div class="slider">
      <a class="slider-arrow slider-arrow--left" @click="prev">
        <img src="~assets/svgs/slider-prev.svg">
      </a>
      <div class="slider-content">
        <a
          v-for="item in displayedItems"
          :key="item.id"
          :href="item.url"
          v-b-tooltip.hover
          :title="item.Company.name"
          class="company"
        >
          <div class="company-logo" :href="item.Company.url">
            <img :src="item.Company.logo">
          </div>
          <div :class="`opinion-signal ${toClassName(item.Signal.name)}-border`">{{ item.Signal.name.toUpperCase() }}</div>
        </a>
      </div>
      <a class="slider-arrow slider-arrow--right" @click="next">
        <img src="~assets/svgs/slider-next.svg">
      </a>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as c from '../../constants'

export default {
  name: 'opinions-slider',
  props: ['items', 'currentPage'],

  data() {
    return {
      startIndex: (this.currentPage - 1) * c.PER_PAGE,
      perPage: c.PER_PAGE,
      numItems: this.items.length,
    }
  },

  computed: {
    displayedItems() {
      const items = this.items.slice(this.startIndex, this.startIndex + this.perPage)

      // Push head items to end page in case end page does not have enough items
      if (this.items.length >= this.perPage && items.length < this.perPage) {
        items.push(...this.items.slice(0, this.perPage - items.length))
      }

      return items
    }
  },

  methods: {
    next() {
      if (this.startIndex === this.numItems - 1) {
        this.startIndex = 0
      } else {
        this.startIndex += 1
      }
    },
    prev() {
      if (this.startIndex === 0) {
        this.startIndex = this.numItems - 1
      } else {
        this.startIndex -= 1
      }
    },

    toClassName(signal) {
      return _.snakeCase(signal)
    }
  },
}
</script>

<style lang="stylus" scoped>
.slider
  max-width 880px
  margin 0 auto

  display flex
  align-items center
  flex-wrap nowrap

  &-arrow
    flex-grow 0
    flex-shrink 0
    display flex
    opacity 0.8

    &:hover
      opacity 1
      cursor pointer

    &--left
      margin-right 20px
    &--right
      margin-left 20px

  &-content
    flex 1
    height 90px
    display flex
    align-items center
    justify-content space-around

  &-container
    padding 20px 0
    border-bottom 2px solid #E9E9EA

.company
  position relative
  display block
  &-logo
    display block
    width 88px
    height 88px
    border 1px solid #ccc
    border-radius 5px
    position relative
    background white
    img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      width 85%
      height auto

.opinion-signal
  font-size 10.5px
  text-align center
  border-radius 5px
  color white
  position absolute
  bottom 0
  left 0
  right 0
</style>
