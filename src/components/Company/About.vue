<template>
  <div class="company-about">
    <h4 class="company-about__title">
      About Abbott Labs (ABT-N)
    </h4>

    <div class="company-about__content">
      Abbott Laboratories is a multinational health care company with headquarters in Lake Bluff, Illinois.

      <a href="#">More at Wikipedia</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'About',

  computed: {
    ...mapGetters(['company']),
  },
}
</script>

<style lang="stylus" scoped>
.company-about
  &__title
    font-size 17px
    line-height 1.25
    margin-bottom 10px

  &__content
    color #80898F
    font-size 16px
    line-height 20px

    a
      color #06c
      text-decoration none

      &:hover
        color #09f
        text-decoration underline

</style>
