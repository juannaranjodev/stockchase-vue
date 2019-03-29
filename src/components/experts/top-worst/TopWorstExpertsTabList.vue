<template>
  <div class="top-worst-experts-tab-list">
    <b-button
      :variant="getVariant('top')"
      @click="$emit('changeTab', 'top')"
      :class="{ 'btn-tab': true, 'btn-tab--active': tab === 'top' }"
    >
      Top 25
    </b-button>
    <b-button
      :variant="getVariant('worst')"
      @click="$emit('changeTab', 'worst')"
      :class="{ 'btn-tab': true, 'btn-tab--active': tab === 'worst' }"
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

    methods: {
      getVariant(buttonName) {
        return buttonName === this.tab ? 'danger' : 'light'
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
