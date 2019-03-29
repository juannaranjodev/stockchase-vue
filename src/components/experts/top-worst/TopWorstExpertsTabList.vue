<template>
  <div class="top-worst-experts-tab-list">
    <b-button
      :variant="btnVariant('top')"
      @click="$emit('changeTab', 'top')"
      :class="btnClass('top')"
    >
      Top 25
    </b-button>
    <b-button
      :variant="btnVariant('worst')"
      @click="$emit('changeTab', 'worst')"
      :class="btnClass('worst')"
    >
      Worst 25
    </b-button>
  </div>
</template>

<script>
  export default {
    name: 'TopWorstExpertsTabList',

    props: {
      tab: {
        type: String,
        required: true,
        validator: (value) => ['top', 'worst'].indexOf(value) !== -1,
      },
    },

    computed: {
      btnVariant() {
        return buttonName => buttonName === this.tab ? 'danger' : 'light'
      },
      btnClass() {
        return buttonName => buttonName === this.tab ? 'btn-tab btn-active' : 'btn-tab'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.top-worst-experts-tab-list
  .btn-tab
    margin-right: 6px
    border-radius: 4px 4px 0 0
    font-size: 17px

    &:focus
      box-shadow: none

    &--active
      background-color: #FF4135
      border-color: #FF4135
</style>
