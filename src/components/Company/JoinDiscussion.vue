<template>
  <div class="join-discussion">
    <div class="join-discussion__header">
      Join the Discussion
    </div>
    <a
      class="join-discussion__link"
      href="#comments"
    >
      Comment Now
    </a>
  </div>
</template>

<script>
export default {
  name: 'JoinDiscussion',
}
</script>

<style lang="stylus" scoped>
.join-discussion
  display flex
  flex-direction column
  align-items center
  border-radius 5px
  background-color #f7f7f7
  padding 15px 0
  line-height normal

  &__header
    font-size 21px
    font-weight bold
    color black
    margin-bottom 10px

  &__link
    height 35px
    color white
    text-decoration none
    background-color #FC2034
    display flex
    align-items center
    text-align center
    border-radius 4px
    padding 0 15px
    font-size 16px

    &:hover
      background-color #FF2E50

</style>
