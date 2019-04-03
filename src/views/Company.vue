<template>
  <div class="company-container">
    <div class="container">
      <h1>this is company view page</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Company',

  title () {
    return 'Canadian Imperial Bank of Commerce (CM-T) Stock Predictions - Stockchase'
  },
}
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px
  margin 0 auto

h1
  color green

@media (max-width 991px)
  .container
    padding 0 10px

</style>
