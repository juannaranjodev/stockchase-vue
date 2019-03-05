<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeSignUp',
  serverCacheKey: () => {
    return `home::sign-up`
  },
}
</script>

<style lang="stylus" scoped>
.sign-up
  height 300px
  background-color rgba(0,0,0,0.1)

</style>
