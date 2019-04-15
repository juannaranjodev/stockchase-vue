<template>
  <div class="company-comments-container">
    <user-reactions
      :item="item"
      type="company"
    />

    <div class="company-comments">
      <vue-disqus
        :shortname="disqusShortName"
        :identifier="disqusIdentifier"
        :url="absoluteUrl"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import md5 from 'md5';
import * as c from '../../constants';
import UserReactions from '../UserReactions.vue';

export default {
  name: 'Comments',

  components: { UserReactions },

  data() {
    return {
      origin: '',
    };
  },

  computed: {
    ...mapGetters(['company']),

    disqusIdentifier() {
      return md5(this.absoluteUrl);
    },

    disqusShortName() {
      return c.DISQUS_SHORTNAME;
    },

    absoluteUrl() {
      return `${this.origin}${this.company.url}`;
    },
  },

  mounted() {
    this.origin = window.location.origin;
  },
};
</script>

<style lang="stylus">
.opinion-comments-modal
  .modal-header
    display none
  .modal-body, .modal-footer
    padding 20px 35px

  .opinion-comment
    font-size 19px
    line-height normal
    margin-top 20px
    *
      font-family inherit !important
      line-height inherit !important
      font-size inherit !important

@media (max-width 991px)
  .opinion-comments-modal
    .modal-body, .modal-footer
      padding 20px 10px
</style>

<style lang="stylus" scoped>
.company
  display flex
  align-items center
  flex-wrap nowrap

  &-logo
    display block
    width 134px
    height 134px
    border 1px solid #ccc
    border-radius 5px
    position relative
    background white
    flex-grow 0
    flex-shrink 0
    margin-right 30px
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

.meta-link
  display block
  color #297AE3
  font-weight bold
  font-size 21px
  line-height normal
  &:hover
    color #09f
    text-decoration underline

.expert
  &-avatar
    margin-bottom 15px
    display inline-block
    img
      width 64px
      height 64px
      background white
      border-radius 5px

.opinion
  &-comment
    font-size 19px
    line-height normal
    margin-top 20px
    &s
      margin-top 20px

  &-date
    text-transform uppercase
    color #b2b2b2
    font-size 16px
    margin 8px 0 30px

@media (max-width 991px)
  .company
    align-items flex-start

    &-logo
      width 96px
      height 96px
      margin-right 15px
</style>
