<template>
  <div class="summary">
    <div class="summary-box">
      <div class="summary-label">
        Opinions<br>Today :
      </div>
      <div class="summary-content">
        <div class="summary-value">
          {{ items.length }}
        </div>
      </div>
    </div>

    <div class="summary-box">
      <div class="summary-label">
        Recent<br>experts :
      </div>
      <div class="summary-content">
        <a
          v-for="expert in recentExperts"
          :key="`expert_${expert.id}`"
          v-b-tooltip.hover
          class="expert-avatar"
          :href="expert.url"
          :title="expert.name"
        >
          <img
            width="50"
            height="50"
            :src="expert.avatar"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Summary',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    recentExperts() {
      return _.chain(this.items)
        .map(item => item.Expert)
        .uniqBy('id')
        .value();
    },
  },
};
</script>

<style lang="stylus" scoped>
.summary
  padding 10px 0
  display flex
  align-items center
  flex-wrap wrap

  &-box
    border 1px solid #D8D8D8
    border-radius 5px
    padding 0 10px
    margin 10px 0
    display flex
    align-items center
    height 76px

    &:not(:last-child)
      margin-right 20px

  &-label
    font-size 15px
    font-weight bold
    color #8B8D8E
    margin-right 15px

  &-content
    display flex
    align-items center

  &-value
    font-size 45px
    font-weight bold
    color #8B8D8E

.expert-avatar
  display flex
  align-items center
  &:not(:last-child)
    margin-right 12px

  img
    border-radius 10%

@media (max-width 991px)
  .summary
    justify-content center
    margin-top 10px
    padding-bottom 0

</style>
