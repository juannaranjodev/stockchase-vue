<template>
  <section
    v-if="totalItems > 0"
    class="paginator">
    <ul>
      <li class="first">
        <button class="btn"/>
      </li>
      <li class="prev">
        <button class="btn"/>
      </li>
      <li
        class="items"
        v-for="n in maxPage"
        :key="n">
        <a 
          href="#"
          :class="isCurrentPage(n)">
          {{ n }}
        </a>
      </li>
      <li class="next">
        <button class="btn"/>
      </li>
      <li class="last">
        <button class="btn"/>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'CardsFilter',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    startPage: {
      type: Number,
      default: 4
    },
    totalItems: {
      type: Number,
      default: 1
    },
    maxPage: {
      type: Number,
      default: 5
    }
  },
  computed: {
    
  },
  methods: {
    isCurrentPage(n){
      console.log(this);
      return n === this.currentPage ? 'active' : null
    },
    pageClick(){

    }
  },
}
</script>

<style lang="stylus">
.paginator
  text-align center
  margin 10px 0
  .btn, .items a
    background-repeat no-repeat
    background-position center
    background-size 50%
    width 40px
    height 40px
    border-radius 0
    background-color #F7F7F7
    border 1px solid #CCC
    border-left none
    &:hover
      background-color #F0F0F0
  ul
    padding 0
    margin 0
    list-style none
    li
      display inline-block
      vertical-align top
    .first .btn
      border-left 1px solid #CCC
      background-image url('/assets/paginator-first.png')
      border-top-left-radius 5px
      border-bottom-left-radius 5px
    .prev .btn
      background-image url('/assets/paginator-prev.png')
    .items a
      display block
      padding 6px
      color #FF4135
      font-size 16px
      &:hover
        text-decoration none
      &.active
        color white
        background-color #FF4135
        border-color #FF4135
        pointer-events none
    .next .btn
      background-image url('/assets/paginator-next.png')
    .last .btn
      background-image url('/assets/paginator-last.png')
      border-top-right-radius 5px
      border-bottom-right-radius 5px
</style>
