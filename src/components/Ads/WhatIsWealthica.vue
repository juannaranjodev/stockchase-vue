<template>
  <div class="banner-options-square">
    <div>
      <script src="https://fast.wistia.com/embed/medias/pxpx7chtea.jsonp" />
      <script src="https://fast.wistia.com/assets/external/E-v1.js" />
      <span
        id="wistia-pxpx7chtea-1"
        class="wistia_embed wistia_async_pxpx7chtea popover=true popoverAnimateThumbnail=true
               wistia_embed_initialized"
      >
        <div
          id="wistia_31.thumb_container"
          class="wistia_click_to_play"
        >
          <div
            id="wistia_74.thumbnail"
          >
            <div id="wistia_90.big_play_button_background" />
            <div
              id="wistia_90.big_play_button_graphic"
              tabindex="0"
              aria-role="Button"
              aria-label="Play"
            />
            <img
              id="wistia_74.thumbnail_img"
              alt="Wistia video thumbnail"
              src="https://embedwistia-a.akamaihd.net/deliveries/5c1e2324217e898a633e781bfa20b1d2adafadda.jpg?image_crop_resized=640x360"
            ></div>
        </div>
      </span>
    </div>
    <p>
      What is Wealthica?
    </p>
  </div>
</template>

<script>
export default {
  name: 'WhatIsWealthica',
};
</script>

<style lang="stylus" scoped>
  .banner-options-square
    padding 8px
    p
      color #6A269B
      font-size 18px
      line-height 20px
      font-weight bold
      margin 0
      margin-top 0
    > div
      .wistia_embed
        display inline-block
        height 60px
        width 120px
        .wistia_click_to_play
          position relative
          height 84px
          width 150px
          #wistia_74.thumbnail
            cursor pointer
            display block
            height 60px
            overflow hidden
            outline none
            position relative
            width 120px
            #wistia_90.big_play_button_background
              height 38px
              position absolute
              width 60px
              z-index 1
              background-color rgba(100, 65, 158, 0.76)
              mix-blend-mode normal
              left 30px
              top 11px
              transition all 80ms ease-out 0s
            #wistia_90.big_play_button_graphic
              background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAmCAYAAACYsfiPAAAAGXRFW…eqvcOzpLNqQ2GtVW8KT0WZ3MeisXAtLixWBQAAQDoEGACTzSwy3SX7YgAAAABJRU5ErkJggg==') 0px 0px / 60px 38px no-repeat transparent
              cursor pointer
              display block
              height 38px
              outline none
              position absolute
              width 60px
              z-index 1
              left 30px
              top 11px
            img
              border 0px
              display block
              float none
              height 60px
              margin 0px
              max-height none
              max-width none
              padding 0px
              position absolute
              width 120px
              left 0px
              top 0px
</style>
