<template>
  <div class="top-worst-experts-tab-list">
    <b-button
      :variant="getVariant('top')"
      @click="$emit('changeTab', 'top')"
    >
      Top 25
    </b-button>
    <b-button
      :variant="getVariant('worst')"
      @click="$emit('changeTab', 'worst')"
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
      },
    }
  }
</script>