<template>
  <div class="itn">
    <h3 class="itn__title d-none d-lg-block">
      Stocks In The News
    </h3>
    <h3 class="itn__title d-lg-none">
      Daily Market Highlights
    </h3>

    <table class="itn__stocks">
      <tbody>
        <tr
          v-for="post in blogPosts"
          :key="post.id"
          class="itn__stock"
        >
          <td class="itn__stock-images d-none d-lg-table-cell">
            <div
              v-if="post.companies.length"
              class="itn__stock-images-container"
            >
              <span
                v-for="(company, index) in post.companies"
                :key="index"
                class="itn__stock-image"
              >
                <a
                  v-if="company.url"
                  :href="company.url"
                >
                  <img
                    :src="company.logo"
                    :title="company.name"
                    :alt="company.name"
                  >
                </a>
                <span v-else>
                  <img
                    :src="company.logo"
                    :title="company.name"
                    :alt="company.name"
                  >
                </span>
              </span>
            </div>
            <div
              v-else
              class="itn__stock-images-container"
            >
              <img
                src="https://stockchase.com/assets/no_logo.png"
                :title="post.title"
                :alt="post.title"
              >
            </div>
          </td>
          <td class="itn__stock-date">
            {{ post.date | formatDate('D/MMM') }}
          </td>
          <td class="itn__stock-hint">
            <div class="itn__stock-hint-content">
              <a
                v-if="post.companies.length"
                :href="post.companies[0].url"
              >{{ post.companies[0].name }}</a>
              {{ post.title }}
            </div>
          </td>
          <td class="itn__stock-sources">
            <div
              v-if="post.sources.length"
              class="itn__stock-sources-container"
            >
              <span>[</span>
              <span
                v-for="(source, index) in post.sources"
                :key="index"
                class="itn__stock-source"
              >
                <span
                  v-if="index > 0"
                  class="d-none d-lg-inline"
                >,</span>
                <span
                  v-if="index > 0 && source.url"
                  class="d-lg-none"
                >,</span>
                <a
                  v-if="source.url"
                  :title="source.name"
                  :href="source.url"
                  class="itn__stock-source-label"
                >
                  <span class="d-none d-lg-inline">{{ source.name }}</span>

                  <span
                    v-if="post.sources.length > 1"
                    class="d-lg-none"
                  >{{ source.name }}</span>
                  <span
                    v-else
                    class="d-lg-none"
                  >More</span>
                </a>

                <span
                  v-else
                  class="itn__stock-source-label"
                >
                  <span class="d-none d-lg-inline">{{ source.name }}</span>
                </span>
              </span>
              <span>]</span>
            </div>
          </td>
          <td class="itn__stock-symbols d-none d-lg-table-cell">
            <div class="itn__stock-symbols-container">
              <span
                v-for="(company, index) in post.companies"
                :key="index"
                class="itn__stock-symbol"
              >
                <a
                  v-if="company.url"
                  :href="company.url"
                >{{ company.symbol }}</a>
                <span v-else>{{ company.symbol }}</span>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="itn__footer d-none d-lg-flex">
      <a
        class="itn__more"
        href="/discover/news"
      >More stocks in the news...</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'InTheNews',

  computed: {
    ...mapGetters(['blogPosts']),
  },
};
</script>

<style lang="stylus" scoped>
.itn
  &__title
    color #bfbfbf
    text-transform uppercase
    font-weight bold
    margin-bottom 0
    font-size 1.4em
    line-height 1

  &__stock
    &s
      width 100%
      max-width 100%

    td
      border-bottom 1px solid #DDD
      padding 7px 10px
      height 30px

      &:first-child
        padding-left 0
      &:last-child
        padding-right 0

    &-image
      &:not(:first-child)
        margin-left 5px

      &s
        min-width 50px

        &-container
          display flex
          align-items center

        img
          max-width 40px
          max-height 30px

    &-date
      color #D9AFB5
      font-size 18px
      font-weight bold
      width 1px

    &-hint
      color #888
      font-size 18px
      width 100%
      max-width 0

      &-content
        width 100%
        display inline-block
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        vertical-align middle

        a
          text-decoration underline
          color #1B475E

          &:hover
            color #EC4D4B

    &-source
      white-space nowrap

      &-label
        &:not(:first-child)
          margin-left 3px

      &s
        color #888
        font-size 18px

        &-container
          display flex
          align-items center

          & > span:first-child
            margin-right 2px

          & > span:last-child
            margin-left 2px

        a
          text-decoration none
          color #888

          &:hover
            color #EC4D4B

    &-symbol
      &:not(:first-child)
        margin-left 5px

      &s
        &-container
          display flex
          align-items center

      a
        font-size 18px
        font-weight bold
        color #8F93A0
        background-color #D8D8D8
        padding 2px 10px
        border-radius 5px
        white-space nowrap

        &:hover
          text-decoration none
          background-color #EC4D4B
          color white

  &__footer
    height 40px
    display flex
    align-items center

  &__more
    color #bfbfbf
    text-decoration none
    font-size 18px

    &:hover
      color inherit

@media (max-width 991px)
  .itn
    background-color #DCDCDC
    padding 10px 0

    &__title
      padding 10px
      color #D9AFB5

    &__stock
      &-source
        width auto

</style>
