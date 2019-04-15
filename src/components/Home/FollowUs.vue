<template>
  <div class="follow-us">
    <h3 class="follow-us__title">
      Follow Us
    </h3>

    <div class="follow-us__links">
      <a
        href="https://www.facebook.com/stockchase/"
        class="follow-us__link"
      >
        <img src="~assets/svgs/facebook_icon.svg">
      </a>
      <a
        href="https://twitter.com/stockchase"
        class="follow-us__link"
      >
        <img src="~assets/svgs/twitter_icon.svg">
      </a>
    </div>

    <hr class="home-divider">
  </div>
</template>

<script>
export default {
  name: 'FollowUs',
};
</script>

<style lang="stylus" scoped>
.follow-us
  &__title
    color black
    font-weight bold
    font-size 13px
    margin-bottom 25px
    text-transform uppercase

  &__link
    display flex

    &:not(:first-child)
      margin-left 10px

    &s
      display flex
      align-items center

</style>
