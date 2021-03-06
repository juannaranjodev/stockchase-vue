<template>
  <div class="slider-container d-none d-lg-block">
    <div class="slider">
      <span
        :class="{
          'carousel-control carousel-control-prev-icon': true,
          'hidden': !hasPrevious,
        }"
        @click="prev"
      />
      <div class="slider-content">
        <a
          v-for="item in displayedItems"
          :key="item.id"
          v-b-tooltip.hover
          :href="item.anchor_url"
          :title="item.Company.name"
          class="company"
        >
          <div
            class="company-logo"
            :href="item.Company.url"
          >
            <img :src="item.Company.logo">
          </div>
          <div :class="`opinion-signal ${toClassName(item.Signal.name)}-border`">
            {{ item.Signal.name | formatSignalName }}
          </div>
        </a>
      </div>
      <span
        :class="{ 'carousel-control carousel-control-next-icon': true, 'hidden': !hasNext }"
        @click="next"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import * as c from '../../constants';

export default {
  name: 'Slider',
  props: {
    items: {
      type: Array,
      default: () => ({}),
    },
    page: {
      type: Number,
      default: 1,
    },
  },

  data() {
    const currentIndex = (this.page - 1) * c.PER_PAGE;
    const maxPossibleIndex = this.items.length > c.PER_PAGE
      ? this.items.length - c.PER_PAGE
      : 0;

    return {
      currentIndex: Math.min(currentIndex, maxPossibleIndex),
      numItems: this.items.length,
    };
  },

  computed: {
    ...mapGetters(['date']),

    displayedItems() {
      return this.items.slice(this.currentIndex, this.currentIndex + c.PER_PAGE);
    },

    hasNext() {
      return (this.currentIndex + c.PER_PAGE) < this.numItems;
    },

    hasPrevious() {
      return this.currentIndex > 0;
    },
  },

  methods: {
    next() {
      if (this.hasNext) {
        this.currentIndex += 1;
      }
    },

    prev() {
      if (this.hasPrevious) {
        this.currentIndex -= 1;
      }
    },

    toClassName(signal) {
      return _.snakeCase(signal);
    },
  },
};
</script>

<style lang="stylus" scoped>
.slider
  max-width 880px
  margin 0 auto

  display flex
  align-items center
  flex-wrap nowrap

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
  user-select none
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
      max-width 85%
      max-height 85%
      width auto
      height auto

.opinion-signal
  font-size 10px
  text-align center
  border-radius 5px
  color white
  position absolute
  bottom 0
  left 0
  right 0
  padding-left 2px
  padding-right 2px
  text-transform uppercase
  letter-spacing -0.3px

.carousel-control
  user-select none
  &:hover
    cursor pointer

  &.hidden
    visibility hidden
    pointer-events none

.carousel-control-prev-icon
  background-image url("~assets/svgs/slider-prev.svg") !important

.carousel-control-next-icon
  background-image url("~assets/svgs/slider-next.svg") !important
</style>
