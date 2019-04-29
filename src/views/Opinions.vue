<template>
  <div class="opinions-container">
    <div class="container">
      <opinions-header :type="type" />
      <opinions-slider
        v-if="isOpinions"
        :items="items"
        :page="currentPage"
      />
      <link-ad />
      <opinions-summary
        v-if="!isOpinions"
        :items="items"
      />

      <div class="opinions-container">
        <date-pagination
          top
          :url-pattern="urlPattern"
          :num-date-items="items.length"
        />
        <opinions-list :items="pageItems" />
        <link-ad class="d-none d-lg-block" />
        <date-pagination
          bottom
          :url-pattern="urlPattern"
          :num-date-items="items.length"
        />
      </div>

      <dianomi-ad />
      <link-ad class="d-none d-lg-block" />
    </div>
  </div>
</template>

<script>
/* global DISQUSWIDGETS */
import { mapGetters } from 'vuex';
import * as c from '../constants';
import OpinionsHeader from '../components/Opinions/Header.vue';
import OpinionsSlider from '../components/Opinions/Slider.vue';
import OpinionsSummary from '../components/Opinions/Summary.vue';
import LinkAd from '../components/Ads/LinkAd.vue';
import DianomiAd from '../components/Ads/DianomiAd.vue';
import DatePagination from '../components/DatePagination.vue';
import OpinionsList from '../components/Opinions/List.vue';

export default {
  name: 'Opinions',

  components: {
    OpinionsHeader,
    LinkAd,
    OpinionsSlider,
    OpinionsSummary,
    DianomiAd,
    DatePagination,
    OpinionsList,
  },

  props: {
    type: {
      type: String,
      default: 'opinions',
    },
  },

  computed: {
    ...mapGetters(['opinions', 'adFree']),

    pageItems() {
      // Skip number paging & show all opinions for the date
      if (this.adFree) return this.items;

      const startIndex = (this.currentPage - 1) * c.PER_PAGE;
      return this.items.slice(startIndex, startIndex + c.PER_PAGE);
    },

    currentPage() {
      return +this.$route.params.page || 1;
    },

    items() {
      return this.opinions;
    },

    isOpinions() {
      return this.type === 'opinions';
    },

    urlPattern() {
      return this.isOpinions ? '/opinions/:date' : '/opinions/market/:date';
    },
  },

  updated() {
    if (typeof DISQUSWIDGETS !== 'undefined') DISQUSWIDGETS.getCount({ reset: true });
  },
};
</script>

<style lang="stylus" scoped>
.container
  box-sizing border-box
  width 1140px
  max-width 100%
  padding 0 20px 20px
  margin 0 auto

@media (max-width 991px)
  .container
    padding 0 10px

</style>
