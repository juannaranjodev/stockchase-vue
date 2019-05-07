<template>
  <div class="review-expert">
    <a
      class="review-expert__link"
      href="#"
      @click="showComments"
    >
      <img
        src="~assets/svgs/star.svg"
        width="12"
      >
      <span>Review {{ expert.first_name }}</span>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventBus from '../../util/EventBus';

export default {
  name: 'Review',

  computed: {
    ...mapGetters(['expert']),
  },

  methods: {
    showComments(e) {
      e.preventDefault();

      EventBus.$emit('showExpertComments');
    },
  },
};
</script>

<style lang="stylus" scoped>
.review-expert
  display flex
  align-items center
  justify-content flex-end
  padding 15px 0
  line-height normal

  &__link
    color white
    text-decoration none
    background-color #FF5030
    display flex
    align-items center
    text-align center
    border-radius 4px
    padding 0.8em 1em
    font-size 14px
    line-height normal

    img
      margin-top 2px
      margin-right 3px

    &:hover
      background-color #FF2E50

</style>
