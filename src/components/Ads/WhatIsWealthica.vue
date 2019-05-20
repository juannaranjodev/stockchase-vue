<template>
  <div class="banner-options-square">
    <!-- eslint-disable max-len -->
    <div class="wistia-widget">
      <script2
        src="https://fast.wistia.com/embed/medias/pxpx7chtea.jsonp"
        async=""
      />
      <script2
        src="https://fast.wistia.com/assets/external/E-v1.js"
        async=""
      />
      <span
        id="wistia-pxpx7chtea-1"
        class="wistia_embed wistia_async_pxpx7chtea popover=true popoverAnimateThumbnail=true"
        style="display:inline-block;height:60px;width:120px"
      >
        <div
          id="wistia_31.thumb_container"
          class="wistia_click_to_play"
          style="position: relative; height: 84px; width: 150px;"
        >
          <div
            id="wistia_74.thumbnail"
            tabindex="0"
            class=""
            style="cursor: pointer; display: block; height: 84px; overflow: hidden; outline: none; position: relative; width: 150px;"
          >
            <div
              id="wistia_90.big_play_button_background"
              style="height: 38px; position: absolute; width: 60px; z-index: 1; background-color: rgba(100, 65, 158, 0.76); mix-blend-mode: normal; left: 45px; top: 23px; transition: all 80ms ease-out;"
            />
            <div
              id="wistia_90.big_play_button_graphic"
              tabindex="0"
              aria-role="Button"
              aria-label="Play"
              class=""
              style="background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAACiCAYAAABh2nDdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAulJREFUeNrs3d1tGlEQBtAlSgEpgXSAO8AdxB2QDuwONhWQDpxUAB14OyAdmA5IB+SOvDdCSHnLn/WdI91XP4z1aYY77DIMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAvnc/nQzsrlYCs4JdTOxvVgKzgd7t23qkKZAW/PLezVhnICn43qg7kBb88tbNUJcgKfr/4+6BSkBX8buviD/KCf7bzh8zgd/cqB3nBt/OH0OD3i7+1KkJW8O38ITj4/eJvqaKQFXw7fwgNfvfo4i/PQgleV/D/0J8+tnO3WCy+qXKGN0pAU5/3D3b+Oj5ZHf/SNHf/7yqu45Nj3Y7n/AWfQHXZV4/5bpXCqE/GqH+tLvw+uvjT8cmymrv/Ril0fHI6/qX93P1d/Ak+QcEvx8HO36hPnOXwsvMflULHJ6fjX5oGO38dnzjr4WXn72EfwSdM7fx3XvBp1Cdn1L9m56/jE6jv/D3so+MT1PEv2fnr+ASqC7+Dh30EnzzLefQflcKoT8aof60u/Grnf/Sf1PHJsZpHfzt/wSfMz52/Ugg+WWrk/6oMgk+OL+3c+oLPv/dWCfgLapdfO/29Uuj4ZJjauRF6wSfHpxb4Wys8oz4ZjvNoPymFjk+G/TzaC73gE6Au8B5a4L2Rx6hPCM/h6/iE+dwCfyP0Oj45o73dvOATZBq8XdeoT5S+mxd6HZ8Ax8Ev6Oj4ROm7eaEXfAL0Czyf5436hPCqLB2fMH03L/Q6PiGj/Z3v2ev45Kiwvxd6wSfHg908/KfOv1+97nqlspAT/Ec/aw05wT/5UQvICn6N9kuVhJzgjyoIOcE/+alqyAr+zgUe5AS/uvy9ikFO8O3mISz4W6M95ATfbh7Cgv9kNw9ZwR9VBXKC/+wCD7KCbzcPYcHfqAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvE4/BBgAB9Vp0xXzB8AAAAAASUVORK5CYII=') 0px 0px / 60px 38px no-repeat transparent; cursor: pointer; display: block; height: 38px; outline: none; position: absolute; width: 60px; z-index: 1; left: 45px; top: 23px;"
            />
            <img
              id="wistia_74.thumbnail_img"
              alt="Wistia video thumbnail"
              src="https://embedwistia-a.akamaihd.net/deliveries/5c1e2324217e898a633e781bfa20b1d2adafadda.jpg?image_crop_resized=640x360"
              style="border: 0px; display: block; float: none; height: 84px; margin: 0px; max-height: none; max-width: none; padding: 0px; position: absolute; width: 150px; left: 0px; top: 0px;"
            >
          </div>
        </div>
      </span>
    </div>
    <!-- eslint-enable max-len -->
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

<style lang="stylus">
// Wistia video popup fix, selecting id="wistia_grid_41_main"
.wistia_popover_embed div[id^='wistia_grid_'][id$='_main']
  height 100% !important
</style>

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

.wistia-widget
  line-height 0px // Fix wrong video duration text positioning

.wistia_embed:not(.wistia_embed_initialized)
  height 60px // Make sure the video widget does not get too big while initializing
</style>
