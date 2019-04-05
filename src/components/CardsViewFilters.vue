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
          <li
            v-for="n in [15, 30, 60]"
            :key="n">
            <a 
              :href="generateURL(n)"
              :class="getItemsPerPage(n)">{{ n }}</a>
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
            @input="onSearchTyping"
          >
          <button 
            class="btn-search"
            @click="onSubmitSearch">
            <i class="icon icon-search"/>
          </button>
          <div class="suggestion">
            <span
              v-if="isTyping"
              class="loading"
            />
            <ul v-if="matches.length > 0">
              <li
                v-for="row in matches"
                :key="row.id"
                @click="onSearchResultsItemClick(row)"
              >{{ row.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cards-search"
      v-if="searchQuery">
      You searched for: <code>{{ searchQuery }}</code>
      <a 
        :href="resetUri"
        class="btn btn-primary btn-sm search-reset" >Reset</a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { setTimeout, clearTimeout } from 'timers';

let wait;

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
    },
    resetUri: {
      type: String,
      default: '',
    },
    pattern: {
      type: String,
      default: '/'
    }
  },
  data(){
    return {
      matches: [],
      isTyping: false,
    }
  },
  computed: {
    ...mapGetters(['shouldShowAd', 'searchedExperts']),
    sortedOptions: () => [
      'Most Recent',
      '0-9',
    ].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')),
    searchQuery() {
      return this.$route.query.search
    },
  },
  methods: {
    getItemsPerPage(pages = 15) {
      return this.$route.params.itemsPerPage && this.$route.params.itemsPerPage == pages ? 'active' : (!this.$route.params.itemsPerPage && pages == 15)? 'active' : null
    },
    generateURL(pages = 15) {
      const { params, query } = this.$route;
      let url = this.resetUri + this.pattern
        .replace(':type', params.type || 'F')
        .replace(':sort', params.sort || 'FirstName')
        .replace(':page', params.page || '1')
        .replace(':direction', params.direction || 'desc' )
        .replace(':itemsPerPage', pages)
  
      return query.search ? `${url}?search=${query.search}` : url
    },
    onSubmitSearch(){
      if(this.$refs.search.value.length > 3){
        let query = encodeURI(this.$refs.search.value);
        // do something here
        window.location = `?search=${query}`
      }
    },
    onSearchTyping(e) {
      this.matches = [];

      if(wait) clearTimeout(wait); // this allows to wait for the next character to by typed before it actually pulls the results

      if(e.target.value.length > 2){
        this.isTyping = true;

        wait = setTimeout(async () => {
          if(this.targetSearch === 'company'){
            
          }else{
            await this.$store.dispatch('SEARCH_EXPERTS', {
              term: e.target.value,
            }).then(() => {
              this.matches = this.$store.state.searchedExperts;
              this.isTyping = false;
            })
          }
        }, 500)
      }
    },
    onSearchResultsItemClick(expert, e) {
      if(expert.id) window.location = expert.url;
    }
  },
}
</script>


<style lang="stylus">
  code
    padding 2px 4px
    font-size 90%
    color #c7254e
    background-color #f9f2f4
    border-radius 4px
  .search-reset
    border-color #CB361C
    background-color #FF5030
    float right
    font-size 12px
  .cards
    &-title
      font-size 1.6em
      margin 0.75em 0
      color #111
      font-weight normal
    &-filter
      border-bottom 11px solid #474747
      margin-bottom 20px
      padding-bottom 10px
    &-search 
      margin-top 10px
      border 1px solid rgba(0,0,0,0.1)
      padding 8px 15px
      border-radius 4px
      line-height 2
  .filters
    border-top 1px solid rgba(0,0,0,0.1)
    padding 10px 0 0
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
      background-image url('~assets/images/arrow-down.png')
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
      .suggestion
        position absolute
        bottom 0
        width 100%
        z-index 10
        > *
          position absolute
          top 0
          min-height 30px
          background-color #EEE
          border 1px solid #DDD
          box-shadow 0 3px 8px rgba(175,175,175,0.6)
          min-width 80%
        .loading
          background-image url('~assets/svgs/loading.svg')
          background-size contain
          background-position center
          background-repeat no-repeat
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
    background-image url('~assets/images/lens.png')
  }
</style>