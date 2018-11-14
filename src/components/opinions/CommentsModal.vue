<template>
  <b-modal
    id="modal_comments"
    ref="commentsModal"
    title="Comments"
    body-class="modal-body--comments"
    @hide="onModalHidden"
  >
    <h3>Comments for opinion id: {{ item.id }}</h3>
    <div v-html="item.content"></div>

    <template slot="modal-footer">
      <div class="modal-footer__left">
      </div>

      <div class="modal-footer__right">
        <button class="modal-button" @click="hideModal">Hide</button>
      </div>
    </template>
  </b-modal>
</template>

<script>

export default {
  name: 'comments-modal',

  data () {
    return {
      item: {},
    };
  },

  methods: {
    setupComments(opinion) {
      this.item = opinion
    },

    hideModal () {
      this.$refs.commentsModal.hide()
    },

    onModalHidden (e) {
      this.item = {}
    },
  }
}
</script>

<style lang="stylus">
.error-text {
  color red;
}

</style>
