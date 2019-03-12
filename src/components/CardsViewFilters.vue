<template>
  <section class="cards-filter">
    <h1 class="cards-title">
      {{ title }}
      <a
        v-if="shouldShowAd"
        href="/premium"
        class="subscribe d-none d-md-inline">Too many ads? Remove ads !</a>
    </h1>
    <div class="filters">
      <div class="col-md-4">
        <label>Show</label>
        <ul class="filters-count">
          <li>
            <a 
              href="#"
              class="active">15</a>
          </li>
          <li>
            <a href="#">30</a>
          </li>
          <li>
            <a href="#">60</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <select class="filters-listby">
          <option 
            v-for="option in sortedOptions" 
            :key="option"
            :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <div class="filters-search">
          <input
            type="text"
            ref="search"
            :placeholder="searchPlaceholder"
            autocomplete="off"
          >
          <button 
            class="btn-search"
            @click="submitSearch">
            <i class="icon icon-search"/>
          </button>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardsFilter',
  props: {
    title: {
      type: String,
      default: 'Cards Filter'
    },
    searchPlaceholder: {
      type: String,
      default: 'Filter by ...'
    },
    targetSearch: {
      type: String,
      default: 'experts'
    }
  },
  computed: {
    ...mapGetters(['shouldShowAd']),
    sortedOptions: () => {
      return [
        'Most Recent',
        '0-9',
      ].concat('abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''))
    },
  },
  methods: {
    submitSearch(){
      if(this.$refs.search.value.length > 3){
        console.log(this.$refs.search.value);
        // do something here
      }
    }
  },
}
</script>


<style lang="stylus">
  .cards
    &-title
      font-size 1.6em
      margin 0.75em 0
      color #111
      font-weight normal
  .filters
    border-bottom 11px solid #474747
    border-top 1px solid rgba(0,0,0,0.1)
    padding 10px 0
    margin-bottom 20px
    &-count
      display inline-block
      padding 0
      list-style none
      position relative
      margin 0
      li
        line-height inherit
        display inline-block
        margin 0 8px
        a
          text-decoration none
          color #312828
          font-size 15px
        a.active
          background-color #FF4135
          color white !important
          padding 2px 7px
          border-radius 3px
          pointer-events none
    &-listby 
      -webkit-appearance none
      -moz-appearance none
      -o-appearance none
      border 1px solid rgba(0,0,0,0.1)
      padding 7px 20px 7px 10px
      cursor pointer
      background-image url(/assets/arrow-down.png)
      background-position center right
      background-size 15px
      background-repeat no-repeat
      text-align left
      background-position-x 95%
      background-position-x calc(100% - 3px)
      border-radius 3px
      height 35px
      background-color white
    &-search
      position relative
      input
        padding 8px 10px
        border 1px solid rgba(0,0,0,0.1)
        width 100%
        padding-right 40px
        height 35px
        border-radius 3px
      .btn-search
        background-color transparent
        position absolute
        top 0
        right 0
        bottom 0
        border none
        cursor pointer
    label
      display inline-block
      font-weight 700
    &:after
      content ''
      clear both
      display block
    & > .col-md-4
      float left
    & > .col-md-4:first-child
      padding-left 0
    & > .col-md-4:nth-child(2)
      padding-right 0
      text-align right
    & > .col-md-4:last-child
      padding-right 0
.icon
  &-search:after{
    background-image url(/assets/lens.png)
  }
</style>
