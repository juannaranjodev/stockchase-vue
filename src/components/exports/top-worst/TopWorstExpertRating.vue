<template>
  <div class="top-worst-expert-rate">
    <img src="~assets/images/stars/star_whole.png">
    <img src="~assets/images/stars/star_whole.png">
    <img src="~assets/images/stars/star_whole.png">
    <img src="~assets/images/stars/star_half.png">
    <img src="~assets/images/stars/star_empty.png">
  </div>
</template>

<script>
export default {
  name: 'TopWorstExpertRating',
}
</script>

<style lang="stylus" scoped>
.top-worst-expert-rate
  display: flex;

  img
    width: 13px;
    height: 13px;
    margin-right: 4px;
</style>
