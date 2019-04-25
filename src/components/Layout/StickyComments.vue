<template>
  <div
    v-if="numDisqusComments > 0"
    class="sticky-comments d-none d-lg-block"
  >
    <div class="container">
      <div class="sticky-comments__container">
        <div :class="{ 'sticky-comments__panel': true, 'sticky-comments__panel--hidden': !opened }">
          <div
            class="sticky-comments__panel-close"
            @click="closePanel"
          >
            <img
              src="~assets/images/close_button.png"
              height="40"
            >
          </div>
          <div class="sticky-comments__panel-inner">
            <div class="sticky-comments__panel-header">
              <a
                target="_blank"
                href="https://www.facebook.com/stockchase/"
              >
                <img src="~assets/images/social-fb.png">
              </a>
              <a
                target="_blank"
                href="https://www.reddit.com/r/stockchase/"
              >
                <img src="~assets/images/social-reddit.png">
              </a>
              <a
                target="_blank"
                href="https://twitter.com/stockchase/"
              >
                <img src="~assets/images/social-twitter.png">
              </a>
            </div>
            <div
              ref="commentsContainer"
              class="sticky-comments__panel-content"
            />
          </div>
        </div>
        <div class="sticky-comments__ui">
          <div
            class="sticky-comments__cta"
            @click="togglePanel"
          >
            <div class="sticky-comments__cta-header">
              Join the discussion
            </div>
            <div class="sticky-comments__cta-content">
              {{ numDisqusComments }} comments in the last 7 days
            </div>
          </div>
          <div
            class="sticky-comments__badge"
            @click="togglePanel"
          >
            <div class="sticky-comments__badge-image">
              <img
                src="~assets/images/comment_area.png"
                height="31"
              >
            </div>
            <div class="sticky-comments__badge-label">
              {{ roundedNumDisqusComments }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cheerio from 'cheerio';
import { truncate } from 'lodash';

export default {
  name: 'StickyComments',

  data() {
    return { opened: false };
  },

  computed: {
    ...mapGetters(['numDisqusComments']),

    roundedNumDisqusComments() {
      const num = this.numDisqusComments;

      if (num > 50) return '50+';
      if (num > 25) return '25+';
      if (num > 10) return '10+';

      return num;
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.commentsContainer) return;

      // Inserting the comments list fetched during page load outside of Vue
      // (see src/index.template.html)
      // This is because the Disqus comments script uses document.write that is
      // not compatible with how Vue works
      const $ = cheerio.load(document.getElementsByClassName('dsq-widget-list')[0].outerHTML);
      const truncateText = length => function doTruncate() {
        $(this).text(truncate($(this).text(), { length, omission: ' ...' }));
      };
      $('.dsq-widget-meta a').each(truncateText(35));
      $('.dsq-widget-comment p').each(truncateText(50));

      this.$refs.commentsContainer.innerHTML = $.html();
    });
  },

  methods: {
    togglePanel() {
      this.opened = !this.opened;
    },

    closePanel() {
      this.opened = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto
  height 0 // important
  display flex
  justify-content flex-end
  align-items flex-end

.sticky-comments
  position fixed
  left 0
  right 0
  bottom env(safe-area-inset-bottom)
  box-sizing initial

  &__container
    margin-bottom 45px
    display flex
    flex-direction column
    align-items flex-end

  &__ui
    display flex
    align-items center
    user-select none

  &__badge
    position relative
    margin-left 15px
    cursor pointer

    &-image
      display flex
      align-items center
      justify-content center
      background-color #3a3a3a
      border-radius 55px
      width 55px
      height 55px

    &-label
      position absolute
      bottom 0
      right 0
      padding 0 3px
      background-color red
      font-size 12px
      font-weight bold
      color white
      height 22px
      min-width 22px
      border-radius 22px
      display flex
      align-items center
      justify-content center

  &__cta
    height 50px
    display flex
    flex-direction column
    align-items center
    justify-content center
    padding 0 15px
    border-radius 5px
    background-color #3a3a3a
    cursor pointer

    &-header, &-content
      color white
      text-align center
      line-height 19px

    &-header
      text-transform uppercase

  &__panel
    margin-bottom 20px
    position relative

    &--hidden
      display none

    &-inner
      padding 10px 18px 10px 0px
      border 1px solid #ccc
      background-color white
      max-height 350px
      width 530px
      border-radius 9px
      overflow-y auto

    &-close
      position absolute
      top 0
      right 0
      margin-top -20px
      margin-right -20px
      display flex
      align-items center
      cursor pointer

    &-header
      margin-bottom 10px
      display flex
      align-items center
      justify-content center

      a:not(:first-child)
        margin-left 10px

    &-content
      >>> .dsq-widget-avatar
        border-radius 38px
        margin 5px 7px 0 -25px
        height 45px
        width 45px

      >>> .dsq-widget-comment
        color #7d7d7d
        margin-top 3px
        padding-left 3px
        font-size 16px
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        display block

      >>> .dsq-widget-user
        color #3c3c3c
        display block
        margin -5px 0 0 30px
        font-size 16px

      >>> .dsq-widget-meta
        margin 0px 0px 15px 30px
        padding-bottom 10px
        border-bottom 1px solid #ccc
        font-size 15px
        display flex
        align-items center

        a
          color #06c
          text-decoration none

          &:hover
            color #09f
            text-decoration underline

          &:first-child
            white-space nowrap
            overflow hidden
            text-overflow ellipsis

          &:nth-child(2)
            color #9e9e9e !important
            flex-shrink 0
            white-space nowrap

@media (max-width 991px)
  .sticky-comments
    display none
</style>
