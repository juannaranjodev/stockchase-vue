<template>
  <section
    v-if="totalItems > perPage"
    class="paginator"
  >
    <p>
      Showing {{ sliceStart | formatNumber }} to {{ sliceEnd | formatNumber }}
      of {{ totalItems | formatNumber }}
    </p>

    <ul>
      <li :class="{ first: true, disabled: currentPage <= 3 }">
        <a
          class="btn"
          :href="main"
          :disabled="currentPage <= 3"
          title="First Page"
        />
      </li>
      <li :class="{ prev: true, disabled: currentPage < 2 }">
        <a
          class="btn"
          :href="generateURL(currentPage - 1)"
          :disabled="currentPage < 2"
          title="Previous Page"
        />
      </li>
      <li
        v-for="n in pageNumbers"
        :key="n"
        class="items"
      >
        <a
          :href="generateURL(n)"
          :class="{ active: n === currentPage }"
        >
          {{ n }}
        </a>
      </li>
      <li :class="{ next: true, disabled: currentPage > (totalPages - 1) }">
        <a
          class="btn"
          :href="generateURL(currentPage + 1)"
          :disabled="currentPage > (totalPages - 1)"
          title="Next Page"
        />
      </li>
      <li :class="{ last: true, disabled: currentPage > (totalPages - 3) }">
        <a
          class="btn"
          :href="generateURL(totalPages)"
          :disabled="currentPage > (totalPages - 3)"
          title="Last Page"
        />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    maxPage: {
      type: Number,
      default: 5,
    },
    perPage: {
      type: Number,
      default: 15,
    },
    type: {
      type: String,
      default: '',
    },
    sort: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'desc',
    },
    main: {
      type: String,
      default: '/',
    },
    pattern: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      currentPage: this.$route.params.page ? Number(this.$route.params.page) : 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    maxArrayLength() {
      return (this.totalPages < this.maxPage) ? this.totalPages : this.maxPage;
    },
    centerPage() {
      return Math.floor(this.maxArrayLength / 2);
    },
    sliceStart() {
      return ((this.currentPage * this.perPage) - this.perPage) + 1;
    },
    sliceEnd() {
      const sliceEnd = this.currentPage * this.perPage;
      return sliceEnd > this.totalItems ? this.totalItems : sliceEnd;
    },
    startIndex() {
      return (this.currentPage > (this.totalPages - this.centerPage))
        ? this.totalPages - (this.maxArrayLength - 1)
        : this.currentPage - this.centerPage;
    },
    pageNumbers() {
      return Array.from(Array(this.maxArrayLength), (x, index) => {
        const currentIndex = index + this.startIndex;
        return (this.startIndex > 0) ? currentIndex : index + 1;
      });
    },
  },
  methods: {
    generateURL(page = 1) {
      const { query } = this.$route;
      let url = this.main;

      if (page > 1) {
        url += this.pattern.replace(':type', this.type)
          .replace(':sort', this.sort)
          .replace(':page', page)
          .replace(':direction', this.direction)
          .replace(':perPage', this.perPage);
      }

      return query.search ? `${url}?search=${query.search}` : url;
    },
  },
};
</script>

<style lang="stylus">
.paginator
  text-align center
  margin 10px 0

  p
    text-align left

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
      background-image url('~assets/images/paginator-first.png')
      border-top-left-radius 5px
      border-bottom-left-radius 5px
      border-right none
    .prev .btn
      background-image url('~assets/images/paginator-prev.png')
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
      background-image url('~assets/images/paginator-next.png')
    .next.disabled .btn
      border-right none
    .last .btn
      background-image url('~assets/images/paginator-last.png')
      border-top-right-radius 5px
      border-bottom-right-radius 5px
</style>
