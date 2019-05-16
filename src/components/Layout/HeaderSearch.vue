<template>
  <div class="search-bar">
    <select2
      wrapper-class="web-search-wrap d-none d-lg-block"
      select-class="web-search-header nav-select"
      :placeholder="baseSettings.placeholder"
      :settings="baseSettings"
      @selecting="onSelecting"
      @enterPressed="onEnterPressed"
    />

    <select2
      wrapper-class="web-search-wrap d-lg-none"
      select-class="web-search-header nav-select"
      :placeholder="smallScreenSettings.placeholder"
      :settings="smallScreenSettings"
      @selecting="onSelecting"
      @enterPressed="onEnterPressed"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import Select2 from '../Select2.vue';
import { APP_URL } from '../../constants';

export default {
  name: 'HeaderSearch',

  components: { Select2 },

  data() {
    const baseSettings = {
      placeholder: 'Search for Company, Expert, or keyword...',
      minimumInputLength: 1,
      maximumSelectionLength: 1,
      multiple: true,
      // instead of writing the function to execute the request we use Select2's convenient helper
      ajax: {
        // TODO reimplement this ajax endpoint in v2
        url: `${APP_URL || ''}/ajax/search`,
        type: 'get',
        dataType: 'json',
        params: {
          contentType: 'application/json',
        },
        quietMillis: 250,
        data(term) {
          return {
            q: term.term, // search term
          };
        },
        // parse the results into the format expected by Select2. since we are using custom
        // formatting functions we do not need to alter the remote JSON data
        processResults(data) {
          const avatarBaseUrl = 'https://stockchase.s3.amazonaws.com/';
          const baseUrl = APP_URL || window.location.origin;

          const result = {
            results: [],
            more: false,
          };

          if (data.companies.length > 0) {
            result.results.push({
              text: 'Companies',
              children: data.companies.map((company) => {
                // TODO confirm the canonical slugify behavior and update this
                const symbol = company.symbol.replace(' (Dead)', '').replace(/[()]/g, '');

                return {
                  id: company.id,
                  text: `${company.name} (${symbol})`,
                  url: `/company/view/${company.id}/${symbol}`,
                  avatar: `https://data.wealthica.com/api/securities/${symbol}/logo?default=${baseUrl}/images/no logo icon @2x.png`,
                  term: data.query,
                };
              }),
            });
          }

          if (data.experts.length > 0) {
            result.results.push({
              text: 'Experts',
              children: data.experts.map(expert => ({
                id: expert.id,
                text: expert.name,
                url: `/expert/view/${expert.id}`,
                avatar: (expert.avatar) ? avatarBaseUrl + expert.avatar : `${baseUrl}/images/expert_profile_default.svg`,
                term: data.query,
              })),
            });
          }

          result.results.push({
            text: `More results for ${data.query}`,
            url: `/search/?q=${data.query}`,
            term: data.query,
            avatar: 'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
            search: true,
          });

          return result;
        },
      },
      templateResult(state) {
        if (state.loading) return state.text;

        const className = (state.search) ? ' more-search' : '';

        let html = (typeof state.url !== 'undefined') ? `<a href="${state.url}" class="search-box-result-item${className}">` : '<div>';

        if (typeof state.avatar !== 'undefined') {
          html += `<img src="${state.avatar}" class="search-box-avatar"/>`;
        }

        const regex = new RegExp(state.term, 'gi');
        const matchedTerm = state.text.match(regex);

        html += state.text.replace(regex, `<strong>${matchedTerm[0]}</strong>`);

        html += (typeof state.url !== 'undefined') ? '</a>' : '</div>';
        return html;
      },
      escapeMarkup(m) { return m; },
    };

    return {
      baseSettings,
      smallScreenSettings: _.extend({}, baseSettings, { placeholder: 'Search...' }),
    };
  },

  methods: {
    onSelecting(e) {
      e.preventDefault();
    },
    onEnterPressed(val) {
      if (val && val.length > 2) window.location = `/search/?q=${val}`;
    },
  },
};
</script>

<!-- TODO rewrite the css so that they can be scoped to this component  -->
<style lang="stylus">
.search-bar
  flex-grow 1

.nav-select
  border none
  height 38px
  border-radius 3px
  padding 0 10px
  display block
  width 100%
  -webkit-appearance initial

.nav-search
  padding 5px 10px
  line-height 1.6
  display block
  outline 0
  box-shadow none
  -webkit-appearance textfield

.web-search-wrap
  width 360px
  border none
  height 40px
  border-radius 3px
  position relative

.web-search-header
  border none
  height 38px
  border-radius 3px
  padding 0 10px
  display block
  width 100%

.web-search-header:focus
  outline none

.select2-container--default.select2-container--focus .select2-selection--multiple,
.select2-container--default .select2-selection--multiple
  border none

.select2-container--default
  .select2-selection--multiple
    .select2-selection__choice
    .select2-selection__rendered
      padding 0
      li
        float none
        padding 0
        line-height inherit
        display block
  .select2-results__option--highlighted[aria-selected]
    background-color transparent
    color inherit
  .select2-search--inline
    .select2-search__field
      padding 5px 10px
      font normal 14px Lato, sans-serif
      line-height 1.6
      display block
      margin 0
      height 36px
      color inherit
  .select2-results__option
    .select2-results__option
      &:hover
        background-color #f0f0f0
  .select2-results__group
    font-size 16px
  .select2-results
    & > .select2-results__options
      max-height 400px
      font-size 14pt
.select2-container--open
  .select2-dropdown--below
    border 1px solid #CCC
.search-box-avatar
  margin-right 8px
  max-width 24px
  border-radius 3px
a.search-box-result-item, a.search-box-result-item:hover
  color inherit
  text-decoration none
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  max-width 100%
  display block
.select2-results > .select2-results__options
  & > .select2-results__option[role="treeitem"]:last-child
    padding 0
    margin-top 15px
  & > .select2-results__option
    &.select2-results__message
      &:last-child
        &:after
          content '...'
.select2-results > .select2-results__options
  & > .select2-results__option.select2-results__message:last-child,
  & > .select2-results__option.loading-results:last-child
    padding 8px
    margin-top 0
.more-search
  color #ec4d4b !important
  border-top 1px dotted #ccc
  padding 10px 8px
  background-color #eee

.web-search-wrap
  height 40px

  .select2-container
    height 40px

  .select2-container--default .select2-search--inline .select2-search__field
    height 40px
    line-height 40px
    padding-top 0
    padding-bottom 0

  .select2-container--default.select2-container--focus .select2-selection--multiple,
  .select2-container--default .select2-selection--multiple
    height 40px

@media (max-width 991px)
  .web-search-wrap
    width 100% !important
    height 38px

    .select2-container
      width 100% !important
      height 38px

    .select2-container--default .select2-search--inline .select2-search__field
      height 38px
      line-height 38px
      padding-top 0
      padding-bottom 0
      width 100% !important

    .select2-container--default.select2-container--focus .select2-selection--multiple,
    .select2-container--default .select2-selection--multiple
      border 1px solid #ccc
      height 38px

  .select2-dropdown.select2-dropdown--below
    min-width 240px
</style>
