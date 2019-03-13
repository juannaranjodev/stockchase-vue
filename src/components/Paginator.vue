<template>
  <section
    v-if="totalItems > 25"
    class="paginator">
    <ul>
      <li 
        class="first" 
        :class="isFirst">
        <button
          class="btn" 
          :disabled="isFirst"/>
      </li>
      <li 
        class="prev"
        :class="hasPrev">
        <button
          class="btn"
          :disabled="hasPrev"/>
      </li>
      <li
        class="items"
        v-for="n in generatePageNumbers"
        :key="n">
        <a 
          href="#"
          :class="isCurrentPage(n)">
          {{ n }}
        </a>
      </li>
      <li 
        class="next"
        :class="hasNext">
        <button
          class="btn"
          :disabled="hasNext"/>
      </li>
      <li
        class="last"
        :class="isLast">
        <button
          class="btn"
          :disabled="isLast"/>
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
    totalItems: {
      type: Number,
      default: 70
    },
    maxPage: {
      type: Number,
      default: 5
    },
    itemsPerPage: {
      type: Number,
      default: 25
    },
  },
  computed: {
    totalPages(){
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    maxArrayLength(){
      return (this.totalPages < this.maxPage)? this.totalPages : this.maxPage
    },
    centerPage(){
      return Math.floor(this.maxArrayLength / 2)
    },
    startIndex(){
      return (this.currentPage > (this.totalPages - this.centerPage))?
        this.totalPages - (this.maxArrayLength - 1) :
        this.currentPage - this.centerPage
    },
    isFirst(){
      return (this.currentPage < (this.totalPages / 2) || this.totalPages < this.maxPage)? 'disabled' : null;
    },
    hasPrev(){
      return this.currentPage < 2 ? 'disabled' : null;
    },
    generatePageNumbers(){
      return Array.from(Array(this.maxArrayLength), (x, index) => {
        var currentIndex = index + this.startIndex;
        return (this.startIndex > 0)? currentIndex : index + 1;
      })
    },
    hasNext(){
      return this.currentPage > (this.totalPages - 1) ? 'disabled' : null;
    },
    isLast(){
      return (this.currentPage < (this.totalPages / 2) || this.currentPage > (this.totalPages - 3))? 'disabled' : null;
    }
  },
  methods: {
    isCurrentPage(n){
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
      &.disabled + li > .btn
        border-left 1px solid #CCC
    .btn[disabled]
      pointer-events none
      opacity 0.3
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
