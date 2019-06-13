<template>
  <div class="top-pick-status">
    <a class="low-high-panel">
      <div class="low-high-bar">
        <div class="middle-splitter" />
        <div
          v-b-tooltip.hover
          class="status-pointer"
          :style="{
            width: `calc(${position}% + 6px`,
            display: showStatus ? 'block' : 'none',
          }"
          :title="`Low: $${lowest}\nHigh: $${highest}\nCurrent: $${current}`"
        >
          <img
            src="~assets/svgs/rectangle_panel.svg"
            class="status-pointer__image"
          >
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'TopPickStatus',

  props: {
    current: {
      type: Number,
      default: 40,
    },
    lowest: {
      type: Number,
      default: 10,
    },
    highest: {
      type: Number,
      default: 100,
    },
  },

  computed: {
    difference() {
      return this.highest - this.lowest;
    },

    showStatus() {
      return this.difference > 1e-6;
    },

    position() {
      return this.showStatus
        ? Math.round((this.current - this.lowest) * 100 / this.difference)
        : 0;
    },
  },
};
</script>

<style lang="stylus" scoped>
.top-pick-status
  position relative
  .low-high-panel
    display: block
    .low-high-bar
      width 55%
      height 4px
      background #E5EBFF
      margin 0 auto
      position relative
      .middle-splitter
        width 5%
        height 5px
        margin 0 auto
        background-color white
      .status-pointer
        position absolute
        top -4px
        &__image
          float right
</style>
