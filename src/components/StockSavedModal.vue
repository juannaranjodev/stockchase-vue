<template>
  <b-modal
    id="modal_stock_saved"
    centered
    hide-footer
    modal-class="stock-saved-modal"
  >
    <div class="stock-saved">
      <span v-if="newlySaved">Stock saved to your watch list successfully.</span>
      <span v-else>Stock is already on your watch list.</span>
      <a href="/portfolio">View Watch List</a>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'StockSavedModal',

  data() {
    return {
      newlySaved: true,
    };
  },

  mounted() {
    this.$bus.$on('saveStock', newlySaved => this.saveStock(newlySaved));
  },

  beforeDestroy() {
    this.$bus.$off('saveStock');
  },

  methods: {
    saveStock(newlySaved) {
      this.newlySaved = newlySaved;
      this.$root.$emit('bv::show::modal', 'modal_stock_saved');
    },
  },
};
</script>

<style lang="stylus">
.stock-saved
  text-align center
  color #ABB2B9
  font-size 18px
  padding 0 20px 20px
  line-height normal

  a
    color #FF2E50
    white-space nowrap
    margin-left 3px

  &-modal
    .modal-header
      border-bottom 0
      padding-bottom 0

    .modal-body
      padding-top 0
</style>
