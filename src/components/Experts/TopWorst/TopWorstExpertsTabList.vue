<template>
  <div class="top-worst-experts-tab-list">
    <b-button
      :variant="getVariant('top')"
      :class="{ 'btn-tab': true, 'btn-tab--active': tab === 'top' }"
      @click="$emit('changeTab', 'top')"
    >
      Top 25
    </b-button>
    <b-button
      :variant="getVariant('worst')"
      :class="{ 'btn-tab': true, 'btn-tab--active': tab === 'worst' }"
      @click="$emit('changeTab', 'worst')"
    >
      Others
    </b-button>
    <div class="space-fill" />
    <b-form-select
      size="sm"
      :value="sortBy"
      :options="options"
      class="select-sort-by"
      @change="$emit('changeSortBy', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'TopWorstExpertsTabList',

  props: {
    tab: {
      type: String,
      required: true,
      validator: value => ['top', 'worst'].indexOf(value) !== -1,
    },
    sortBy: {
      type: String,
      required: true,
      validator: value => [
        'Overall', '1 Month', '6 Months', '12 Months', '2 Years', '5 Years',
      ].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      options: [
        { value: 'Overall', text: 'Overall ranking' },
        { value: '1 Month', text: '1 Month ranking' },
        { value: '6 Months', text: '6 Months ranking' },
        { value: '12 Months', text: '12 Months ranking' },
        { value: '2 Years', text: '2 Years ranking' },
        { value: '5 Years', text: '5 Years ranking' },
      ],
    };
  },


  methods: {
    getVariant(buttonName) {
      return buttonName === this.tab ? 'danger' : 'light';
    },
  },
};
</script>

<style lang="stylus" scoped>
.top-worst-experts-tab-list
  display flex

  .btn-tab
    margin-right: 6px
    border-radius: 4px 4px 0 0
    font-size: 17px

    &:focus
      box-shadow: none

    &--active
      background-color: #FF4135
      border-color: #FF4135
  .select-sort-by
    width 200px
    align-self center
    font-size 95%
  .space-fill
    flex 1
</style>
