<template>
  <section
    v-if="totalItems > 25"
    class="paginator">
    <p>
      Showing {{ sliceStart }} to {{ slideEnd }} of {{ totalItems }}
    </p>
    <ul>
      <li :class="{ first: true, disabled: currentPage <= 3 }">
        <button
          class="btn" 
          :disabled="currentPage <= 3"/>
      </li>
      <li :class="{ prev: true, disabled: currentPage < 2 }">
        <button
          class="btn"
          :disabled="currentPage < 2"/>
      </li>
      <li
        class="items"
        v-for="n in generatePageNumbers"
        :key="n">
        <a 
          href="#"
          :class="{ active: n === currentPage }">
          {{ n }}
        </a>
      </li>
      <li :class="{ next: true, disabled: currentPage > (totalPages - 1) }">
        <button
          class="btn"
          :disabled="currentPage > (totalPages - 1)"/>
      </li>
      <li :class="{ last: true, disabled: currentPage > (totalPages - 3) }">
        <button
          class="btn"
          :disabled="currentPage > (totalPages - 3)"/>
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
      default: 0
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
    sliceStart(){
      return ((this.currentPage * this.itemsPerPage) - this.itemsPerPage) + 1
    },
    slideEnd(){
      var sliceEnd = this.currentPage * this.itemsPerPage;
      return sliceEnd > this.totalItems ? this.totalItems : sliceEnd
    },
    startIndex(){
      return (this.currentPage > (this.totalPages - this.centerPage))?
        this.totalPages - (this.maxArrayLength - 1) :
        this.currentPage - this.centerPage
    },
    generatePageNumbers(){
      return Array.from(Array(this.maxArrayLength), (x, index) => {
        var currentIndex = index + this.startIndex;
        return (this.startIndex > 0)? currentIndex : index + 1;
      })
    },
  },
  methods: {
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
      border-right none
    .prev .btn
      background-image url('/assets/paginator-prev.png')
      border-left 1px solid #CCC
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
    .next.disabled .btn
      border-right none 
    .last .btn
      background-image url('/assets/paginator-last.png')
      border-top-right-radius 5px
      border-bottom-right-radius 5px
</style>
