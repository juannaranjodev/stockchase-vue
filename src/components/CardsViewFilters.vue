<template>
  <section class="cards-filter">
    <h1 class="cards-title">
      {{ title }}
      <a
        v-if="shouldShowAd"
        href="/premium"
        class="subscribe d-none d-md-inline"
      >Too many ads? Remove ads !</a>
    </h1>
    <div class="filters">
      <div class="col-md-4">
        <label>Show</label>
        <ul class="filters-count">
          <li
            v-for="n in [ 15, 30, 60 ]"
            :key="n"
          >
            <a
              :href="generateURL(n)"
              :class="{ active: perPage === n }"
            >{{ n }}</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <select
          class="filters-listby"
          @change="onAlphabeticalChange"
        >
          <option
            v-for="option in sortedOptions"
            :key="option"
            :selected="setSelectDefault(option)"
            :value="option"
          >
            {{ option === 'all' ? 'Most Recent' : option.toUpperCase() }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <div class="filters-search">
          <input
            ref="search"
            type="text"
            :placeholder="searchPlaceholder"
            autocomplete="off"
            @keyup.enter="onSubmitSearch"
            @input="onSearchTyping"
            @blur="onSearchFocusOut"
          >
          <button
            class="btn-search"
            @click="onSubmitSearch"
          >
            <i class="icon icon-search" />
          </button>
          <div class="suggestion">
            <span
              v-if="isTyping"
              class="loading"
            />
            <ul v-if="matches.length > 0">
              <!-- eslint-disable vue/no-v-html -->
              <li
                v-for="row in matches"
                :key="row.id"
                @click="onSearchResultsItemClick(row)"
                v-html="renderSearchResultItem(row.name)"
              />
              <!-- eslint-enable vue/no-v-html -->
              <li
                v-if="totalSearchedResults > 5"
                class="link"
                @click="onSubmitSearch"
              >
                See all {{ totalSearchedResults }} results
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="searchQuery"
      class="cards-search"
    >
      You searched for: <code>{{ searchQuery }}</code>
      <a
        :href="resetUri"
        class="btn btn-primary btn-sm search-reset"
      >Reset</a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { setTimeout, clearTimeout } from 'timers';

let wait;

export default {
  name: 'CardsViewFilters',
  props: {
    title: {
      type: String,
      default: 'Cards Filter',
    },
    searchPlaceholder: {
      type: String,
      default: 'Filter by ...',
    },
    targetSearch: {
      type: String,
      default: 'experts',
    },
    resetUri: {
      type: String,
      default: '',
    },
    pattern: {
      type: String,
      default: '/',
    },
    currentLimit: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      matches: [],
      isTyping: false,
      totalSearchedResults: 0,
    };
  },
  computed: {
    ...mapGetters(['shouldShowAd', 'searchedExperts']),

    sortedOptions: () => [
      'all',
      '0-9',
    ].concat('abcdefghijklmnopqrstuvwxyz'.split('')),

    searchQuery() {
      return this.$route.query.search;
    },

    perPage() {
      return Number(this.$route.params.perPage) || this.currentLimit;
    },
  },
  methods: {
    setSelectDefault(option) {
      return this.$route.params.character && option.toLowerCase() === this.$route.params.character;
    },

    renderSearchResultItem(name) {
      return name.replace(new RegExp(this.$refs.search.value, 'ig'), `<span>${this.$refs.search.value}</span>`);
    },

    generateURL(perPage = 15) {
      const { params, query } = this.$route;

      const url = this.pattern
        .replace(':character', query.search ? 'all' : params.character || 'all')
        // NOTE in Expert type should be 'F' for 'FirstName', using 'C' now for exact same url as v1
        .replace(':type', 'C')
        .replace(':sortBy', this.targetSearch === 'companies' ? 'name' : params.sortBy || 'FirstName')
        .replace(':direction', params.direction || 'desc')
        .replace(':perPage', perPage);

      return query.search ? `${url}?search=${query.search}` : url;
    },

    onSubmitSearch(e) {
      e.preventDefault();

      if (this.$refs.search.value.length >= 3) {
        const query = encodeURI(this.$refs.search.value);
        window.location = `/${this.targetSearch === 'companies' ? 'company' : 'expert'}?search=${query}`;
      }
    },

    onSearchTyping(e) {
      this.matches = [];

      // this allows to wait for the next character to by typed before it actually pulls the results
      if (wait) clearTimeout(wait);

      if (e.target.value.length > 2) {
        this.isTyping = true;
        // wait for some time before it fetches data. This eliminates too many multiple queries
        wait = setTimeout(async () => {
          if (this.targetSearch === 'companies') {
            // this is for the dropdown
            await this.$store.dispatch('SEARCH_COMPANIES', {
              term: e.target.value,
            }).then(() => {
              const { searchedCompanies, totalSearchedCompanies } = this.$store.state;

              this.matches = searchedCompanies;
              this.totalSearchedResults = totalSearchedCompanies;
              this.isTyping = false;
            });
          } else {
            // this is for the dropdown
            await this.$store.dispatch('SEARCH_EXPERTS', {
              term: e.target.value,
            }).then(() => {
              const { searchedExperts, totalSearchedExperts } = this.$store.state;

              this.matches = searchedExperts;
              this.totalSearchedResults = totalSearchedExperts;
              this.isTyping = false;
            });
          }
        }, 500);
      } else {
        this.resetSearchResults();
      }
    },

    onSearchResultsItemClick(target) {
      if (target.id) window.location = target.url;
    },

    onAlphabeticalChange(e) {
      // Defaults to searching first name for experts and name for companies
      // NOTE in Expert type should be 'F' for 'FirstName', using 'C' now for exact same url as v1
      const pattern = this.targetSearch === 'companies'
        ? '/company/index/:character/C'
        : '/expert/index/:character/C';

      window.location = e.target.value === 'all'
        ? this.resetUri
        : pattern.replace(':character', e.target.value);
    },

    onSearchFocusOut() {
      setTimeout(() => { // required in order for the `see all x results` to work
        this.resetSearchResults();
      }, 200);
    },

    resetSearchResults() {
      this.matches = [];
      this.totalSearchedResults = 0;
      this.isTyping = false;
    },
  },
};
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
      .subscribe
        float right
        font-size 15px
        margin-top 5px
        color black
        text-decoration underline
    &-filter
      padding-bottom 5px
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
        ul
          list-style none
          padding 0
          li
            padding 3px 15px
            text-transform capitalize
            &:hover
              cursor pointer
              background-color rgba(175,175,175,0.2)
          span
            font-weight bold
          .link
            color #EC4D4B
            text-transform inherit
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
      margin-bottom 5px
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
