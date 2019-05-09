<template>
  <div class="company-chart">
    <div class="company-chart__header">
      <div class="company-chart__header-left">
        <h3 class="company__name-symbol">
          {{ company.name }}
          ({{ company.symbol }})
        </h3>
        <a
          class="company__save"
          href="#"
          @click="saveStock"
        >
          <img
            src="~assets/svgs/add-watchlist-new.svg"
            width="24"
          >
          <span>SAVE</span>
        </a>
      </div>
      <div
        v-if="quoteDate"
        class="company-chart__header-right"
      >
        <div class="company-quote__date">
          {{ quoteDate | formatDate('ll, h:mm a') }}
        </div>
      </div>
    </div>

    <div
      v-if="company.quote"
      class="company-quote"
    >
      <div class="company-quote__price">
        {{ company.quote.price | formatNumber('0,0.00') }}
      </div>
      <div class="company-quote__change">
        <img
          v-if="company.quote.change < 0"
          src="~assets/svgs/red_arrow.svg"
          width="10"
        >
        <img
          v-if="company.quote.change > 0"
          src="~assets/svgs/green_arrow.svg"
          width="10"
        >
        <div
          :class="{
            'company-quote__change-value': true,
            green: company.quote.change > 0,
            red: company.quote.change < 0,
          }"
        >
          {{ quoteChangeValue | formatNumber('0,0.00') }}
          ({{ quoteChangePercent | formatPercentage }})
        </div>
      </div>
    </div>

    <div :class="{ 'company-profile-chart': true, active: company.active }">
      <div
        v-if="company.active"
        id="container-stockchart"
        ref="chartContainer"
        class="container-stockchart is--loading"
      >
        <div class="container-stockchart-small" />
      </div>
      <span v-else>This company is not ACTIVE.</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';
import Highcharts from 'highcharts';
import { APP_URL } from '../../constants';

const fromDate = moment().subtract(6, 'months').format('YYYY-MM-DD');

export default {
  name: 'Chart',

  data() {
    return {
      quoteDate: null,
    }
  },

  computed: {
    ...mapGetters(['company', 'user', 'loggedIn']),

    lastQuotePrice() {
      return this.company.quote.price - this.company.quote.change;
    },

    quoteChangeValue() {
      return Math.abs(this.company.quote.change);
    },

    quoteChangePercent() {
      return this.quoteChangeValue / this.lastQuotePrice;
    },

    isWatching() {
      if (!this.loggedIn) return false;

      const { user } = this;
      const userStocks = user.UserStocks || [];

      return !!_.find(userStocks, { user_id: user.id, company_id: this.company.id });
    },
  },

  watch: {
    user(user) {
      if (!user.loaded) return;

      const baseUrl = APP_URL || window.location.origin;
      const $containerStockchart = $(this.$refs.chartContainer);
      const companyId = this.company.id;

      var stockchart = {
        init: function (data, $containerStockchart) {

          var $containerStockchartSmall = $containerStockchart.find('> .container-stockchart-small');

          var stockchartTitle = data.title ? data.title : '';
          var stockchartCompanyName = data.company_name ? data.company_name : '';
          var stockchartCompanySymbol = data.company_symbol ? data.company_symbol : '';
          var stockchartSubtitle = data.subtitle ? data.subtitle : '';
          var stockchartData = data.data;
          var chartData = {};

          // Handle chart when data series empty
          if( typeof stockchartData == 'undefined' ) {
            stockchartData = [0, 100]
          }

          var tickStep = data.data.length > 9 ? parseInt(data.data.length / 5) : (data.data.length ? data.data.length : 0);
          var tickPositions = [];
          for (var i = 1; i < data.data.length; i += tickStep) {
            tickPositions.push(i);
          }

          chartData = {
            company_name: stockchartCompanyName,
            company_symbol: stockchartCompanySymbol,
            title: stockchartTitle,
            subtitle: stockchartSubtitle,
            data: stockchartData,
            date: data.date,
            tickPositions: tickPositions,
            avatar_data: data.avatar_data,
            avatar_tickPositions: data.avatar_tickPositions,
            maxPrice: data.maxPrice,
            minPrice: data.minPrice,
          };

          var that = this;
          Highcharts.chart({
            chart: {
              type: 'areaspline',
              renderTo: $containerStockchartSmall[0],
              // ignoreHiddenSeries: false,
              // backgroundColor: '#FFFFFF',
            },
            title: {
              text: '',
            },
            tooltip: {
              style: {
                color: '#333',
                fontWeight: 'bold'
              }
            },
            xAxis: [{
              categories: chartData.date,
              labels: {
                formatter: function() {
                  return that.convert_date( this.value );
                },
              },
              tickmarkPlacement: 'on',
              tickPosition: "inside",
              tickLength: 5,
              tickPositions: chartData.tickPositions,
            }, {
              linkedTo: 0,
              categories: chartData.avatar_data,
              labels: {
                useHTML: true,
                rotation: 0,
                formatter: function() {
                  var avatarUrl = this.value.expert_avatar
                  ? `https://stockchase.s3.amazonaws.com/${this.value.expert_avatar}`
                  : `${window.location.protocol}//${window.location.host}/assets/svgs/expert_profile_default.svg`;
                  var signalClass = this.value.signal_name.toLowerCase().replace(/\/| |'/g, '-');

                  return `
                  <div
                  class="hc-xaxis-avatar"
                  data-date="${this.value.date}"
                  data-company-id="${this.value.company_id}"
                  >
                  <img src="${avatarUrl}" class="hc-xaxis-avatar__img hc-xaxis-avatar__img--${signalClass}" alt="xaxis-avatar" />
                  <div class="hc-tooltip__signal-badge hc-tooltip__signal-badge--${signalClass}"></div>
                  </div>
                  `;
                },
              },
              lineWidth: 0,
              tickLength: 0,
              tickPositions: chartData.avatar_tickPositions,
            }],
            yAxis: {
              title: {
                text: 'Price',
                enabled: false,
              },
              gridLineWidth: 0,
              labels: {
              },
              tickInterval: 0.01,
              max: chartData.maxPrice,
              min: chartData.minPrice,
            },
            legend: {
              enabled: false,
            },
            series: [{
              name: 'Price',
              data: chartData.data,
              color: '#ed4e41',
            }],
            credits: {
              enabled: false
            },
            plotOptions: {
              areaspline: {
                fillOpacity: 0.1
              }
            },
          });
        },
        convert_date: function( date_raw ) {

          var date = new Date(date_raw);
          var monthNames = [
            'Jan', 'Feb', 'Mar',
            'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct',
            'Nov', 'Dec'
          ];

          return date.getDate() + ' ' + monthNames[ date.getMonth() ]; // + ' ' + date.getFullYear().toString().substr(-2);

        },
      };

      // TODO reimplement this ajax endpoint in v2
      $.ajax({
        url: baseUrl + '/ajax/company/' + companyId + '/fromdate/' + fromDate,
      })
      .done(function( response ){
        var histories = response.data.histories;
        var opinions = response.data.opinions.reverse();
        var chart_data_length = histories.length;
        var first_data = histories[0];
        var last_data = histories[ histories.length - 1 ];

        if( histories.length > 0 ) {
          var company_name = histories[0].company_name;
          var company_symbol = histories[0].company_symbol;
        }

        var chart_data = {
          company_name: company_name,
          company_symbol: company_symbol,
          title: chart_data_length ? chart_data_length + ' Data Points' : 'Data not available',
          subtitle: chart_data_length ? stockchart.convert_date( first_data.date ) + ' - ' + stockchart.convert_date( last_data.date ) : '',
          data: [],
          date: [],
          avatar_data: [],
          avatar_tickPositions: [],
        };

        var maxPrice = 0;
        var minPrice = 1e12;
        for( var i = 0, opinionIndex = 0; i < chart_data_length; i++ ) {
          if (histories[i].price && histories[i].price > maxPrice) {
            maxPrice = histories[i].price;
          }
          if (histories[i].price && histories[i].price < minPrice) {
            minPrice = histories[i].price;
          }
          chart_data.data.push( parseFloat( histories[i].price ));
          chart_data.date.push( histories[i].date );
          chart_data.avatar_data.push( 0 );

          if (opinionIndex < opinions.length) {
            if (opinions[opinionIndex].date == histories[i].date) {
              chart_data.avatar_data[i] = opinions[opinionIndex];
              chart_data.avatar_tickPositions.push(i);
              opinionIndex++;
              while (opinionIndex < opinions.length && opinions[opinionIndex - 1].date === opinions[opinionIndex].date) {
                opinionIndex++;
              }
            }
          }
        }
        chart_data.maxPrice = maxPrice;
        chart_data.minPrice = minPrice;
        // Init chart
        stockchart.init( chart_data, $containerStockchart );
        $containerStockchart.removeClass('is--loading').attr('data-init', true);
      });

      // Setup events
      $(document).on("mouseover", ".hc-xaxis-avatar__img", function(e) {
        clearTimeout($(".hc-xaxis-avatar__img").data('hoverTimeoutId'));
        $('.xaxis_avatar_details').remove();
        var $parent = $(this).closest(".hc-xaxis-avatar");
        var xaxis_avatar_details = document.createElement('div');
        xaxis_avatar_details.setAttribute('class', 'xaxis_avatar_details');

        var content_div = document.createElement('div');
        content_div.setAttribute('class', 'hc-tooltip__container');

        var company_id = $parent.data('company-id');
        var date = $parent.data('date');

        // TODO reimplement this ajax endpoint in v2
        $.ajax({
          url : `${baseUrl}/ajax/company/${company_id}/exactdate/${date}`,
          type: "GET",
          processData: false,
          contentType: false,
          success: function(data, textStatus, jqXHR) {
            var carouselIndicators = ``;
            var carouselItems = ``;

            data.data.forEach((data, index) => {
              var avatarUrl = data.expert_avatar
              ? `https://stockchase.s3.amazonaws.com/${data.expert_avatar}`
              : `${window.location.protocol}//${window.location.host}/assets/svgs/expert_profile_default.svg`;
              var signalClass = data.signal_name.toLowerCase().replace(/\/| |'/g, '-');
              var opinionUrl = `${window.location.protocol}//${window.location.host}/opinions/view/${data.opinion_id}`;

              carouselIndicators += `<li data-target="#hc-tooltip-carousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>`
              carouselItems += `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <div class="hc-tooltip__content">
              <div>
              <img src="${avatarUrl}" class="hc-tooltip__avatar" />
              <div class="hc-tooltip__signal-badge hc-tooltip__signal-badge--${signalClass}"></div>
              </div>
              <div class="hc-tooltip__expert-info">
              <h3 class="hc-tooltip__expert-name">${data.expert_name}</h3>
              <p class="hc-tooltip__expert-title">${data.expert_title}</p>
              </div>
              </div>
              <div class="hc-tooltip__opinion-comment">${data.comment}</div>
              <div class="hc-tooltip__opinion-link"><a href="${opinionUrl}">Read more</a></div>
              <div class="hc-tooltip__signal-name hc-tooltip__signal-name--${signalClass}">${data.signal_name}</div>
              <div class="hc-tooltip__date">${date}</div>
              </div>
              `;
            });

            content_div.innerHTML = `
            <div id="hc-tooltip-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            ${data.data.length > 1 ? carouselIndicators : ''}
            </ol>
            <div class="carousel-inner">
            ${carouselItems}
            </div>
            </div>
            `;
            xaxis_avatar_details.append(content_div);

            $parent.append(xaxis_avatar_details);

            const $xaxis_avatar_details = $('.xaxis_avatar_details');

            const { left: tooltipLeft, top: tooltipTop } = $xaxis_avatar_details.offset();
            const tooltipWidth = $xaxis_avatar_details.width();
            if (tooltipLeft < 100) {
              $xaxis_avatar_details.offset({ top: tooltipTop, left: 100 });
            }
            const { left: chartLeft, top: chartTop } = $('.container-stockchart-small').offset();
            const chartWidth = $('.container-stockchart-small').width();
            if (tooltipLeft < chartLeft + 10) {
              $xaxis_avatar_details.offset({ top: tooltipTop, left: chartLeft + 10 });
            }
            if (tooltipLeft + tooltipWidth > chartLeft + chartWidth) {
              $xaxis_avatar_details.offset({ top: tooltipTop, left: chartLeft + chartWidth - tooltipWidth - 30 });
            }

          },
          error: function(jqXHR, textStatus, errorThrown){
            // request failed; do nothing
          }
        });
      });

      $(document).on("mouseleave", ".hc-xaxis-avatar__img", function(e) {
        clearTimeout($(this).data('hoverTimeoutId'));
        $(".hc-xaxis-avatar__img").data('hoverTimeoutId', setTimeout(function () {
          $('.xaxis_avatar_details').remove();
        }, 100));
      });

      $(document).on("mouseenter", ".xaxis_avatar_details", function(e) {
        clearTimeout($(".hc-xaxis-avatar__img").data('hoverTimeoutId'));
      });

      $(document).on("mouseleave", ".xaxis_avatar_details", function() {
        $(".xaxis_avatar_details").remove();
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.quoteDate = this.getQuoteDate();
    });
  },

  methods: {
    getQuoteDate() {
      return this.company && this.company.quote.quote_date
        ? moment(this.company.quote.quote_date)
        : null;
    },

    saveStock(e) {
      e.preventDefault();

      if (this.isWatching) {
        this.$bus.$emit('saveStock', false);
        return;
      }

      this.$store.dispatch('CREATE_USER_STOCK', { companyId: this.company.id })
        .then(() => this.$bus.$emit('saveStock', true))
        .catch((err) => {
          // If the stock is already in watch list, simply consider this a
          // successful save so as to not confuse user
          if (err.status === 409) {
            this.$bus.$emit('saveStock', false);
            return;
          }

          /* eslint-disable-next-line no-alert */
          alert(`Oops, an error happened: "${err.statusText || err.status}". Please contact us.`);
        });
    },
  },
};
/* eslint-enable */
</script>

<style lang="stylus">
@import '~assets/css/chart.scss'
</style>

<style lang="stylus" scoped>
.company
  &-chart
    border-top 1px solid #E9E9EA

    &__header
      display flex
      align-items center
      justify-content space-between
      margin 10px 0

      &-left
        margin-right 10px
        flex 1

      &-left, &-right
        display flex
        align-items center

  &__name-symbol
    color #7A8389
    font-size 21px
    margin 0

    &:not(:last-child)
      margin-right 10px

  &__save
    color red
    display flex
    align-items center

    img
      margin-right 5px

  &-quote
    display flex
    align-items flex-end
    margin-bottom 15px

    &__date
      color #ABB3B9
      font-size 13px

    &__price
      font-size 41px
      color #111
      line-height 1

    &__change
      display flex
      align-items center
      font-size 16px
      margin-left 18px

      img
        margin-right 3px

      &-value
        color #111

        &.red
          color #F23434
        &.green
          color #04CA00

@media (max-width 991px)
  .company
    &-chart
      &__header
        display block

</style>
