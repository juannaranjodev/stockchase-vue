<template>
  <div class="company-chart">
    <div class="company-chart__header">
      <div class="company-chart__header-left">
        <h3 class="company__name-symbol">
          {{ company.name }}
          ({{ company.symbol }})
        </h3>
        <a
          v-if="!isWatching"
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
          {{ quoteDate | formatDate('ll, h:mm:ss a') }}
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
        <div class="container-stockchart-big" />
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

const fromDate = moment().subtract(6, 'months').format('YYYY-MM-DD');

export default {
  name: 'Chart',

  computed: {
    ...mapGetters(['company', 'user', 'loggedIn']),

    quoteDate() {
      return this.company.quote.quote_date ? moment.utc(this.company.quote.quote_date) : null;
    },

    lastQuotePrice() {
      return this.company.quote.price - this.company.quote.change;
    },

    quoteChangeValue() {
      return Math.abs(this.company.quote.change)
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

      // NOTE change this to 'https://staging.stockchase.com' for dev
      const baseUrl = window.location.origin;
      const $containerStockchart = $(this.$refs.chartContainer);
      const companyId = this.company.id;

      var stockchart = {
        init: function (data, $containerStockchart) {

          var $containerStockchartSmall = $containerStockchart.find('> .container-stockchart-small');
          var $containerStockchartBig = $containerStockchart.find('> .container-stockchart-big');

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
                  : `${window.location.protocol}//${window.location.host}/images/expert_profile_default.svg`;
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

          Highcharts.chart({
            chart: {
              renderTo: $containerStockchartBig[0],
            },
            title: {
              text: chartData.company_name+' ('+chartData.company_symbol+')<br>'+chartData.title,
              style: {
                color: chartData.data.length ? '#25292B' : '#FF0000',
                fontSize: '16px',
              },
            },
            subtitle: {
              text: chartData.subtitle,
              style: {
                fill: '#6F7980',
                fontSize: '12px',
              },
            },
            xAxis: {
              categories: chartData.date,
              labels: {
                formatter: function() {
                  return that.convert_date( this.value )
                },
              },
              tickmarkPlacement: 'on',
              tickPosition: "inside",
              tickLength: 5,
              tickPositions: chartData.tickPositions,
            },
            yAxis: {
              title: {
                text: 'Price',
                enabled: false,
              },
              alternateGridColor: '#f6f7f9',
              gridLineWidth: 0,
              labels: {
              },
              tickInterval: 0.01,
            },
            legend: {
              enabled: false,
            },
            series: [{
              name: 'Price',
              type: 'spline',
              data: chartData.data,
              color: '#ed4e41',
            }],
            credits: {
              enabled: false
            },
          });

          // Init stock chart click event
          // $containerStockchart.on('click', function(e){
          //     if (e.target.className === 'hc-xaxis-avatar__img') {
          //         return;
          //     }

          //     $.fancybox.open({
          //         src  : $containerStockchartBig,
          //         type : 'inline',
          //         margin : [44, 0],
          //     });

          // });
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
              : `${window.location.protocol}//${window.location.host}/images/expert_profile_default.svg`;
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

  methods: {
    saveStock(e) {
      e.preventDefault();

      this.$store.dispatch('CREATE_USER_STOCK', { companyId: this.company.id })
        .then(() => this.$root.$emit('bv::show::modal', 'modal_stock_saved'))
        .catch((err) => {
          // If the stock is already in watch list, simply consider this a
          // successful save so as to not confuse user
          if (err.status === 409) {
            this.$root.$emit('bv::show::modal', 'modal_stock_saved');
            return;
          }

          /* eslint-disable-next-line no-alert */
          alert(`Opps, an error happened: "${err.statusText || err.status}". Please contact us.`);
        });
    },
  },
};
/* eslint-enable */
</script>

<style lang="stylus">
.hc-xaxis-avatar {
  position: relative;
  width: 44px;
  height: 44px;
}

.hc-xaxis-avatar__img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-box-shadow: 0 5px 11px 0 rgba(0,0,0,0.11);
  box-shadow: 0 5px 11px 0 rgba(0,0,0,0.11);
}

.hc-xaxis-avatar__img:hover {
  width: 44px;
  height: 44px;
  border: 4px solid;
  margin-top: -4px;
  margin-left: -4px;
}

.hc-xaxis-avatar__img--buy:hover,
.hc-xaxis-avatar__img--week-buy:hover {
  border-color: #18DB88;
}

.hc-xaxis-avatar__img--strong-buy:hover {
  border-color: #5CE23F;
}

.hc-xaxis-avatar__img--top-pick:hover {
  border-color: #178DFF;
}

.hc-xaxis-avatar__img--comment:hover,
.hc-xaxis-avatar__img--n-a:hover,
.hc-xaxis-avatar__img--unspecified:hover,
.hc-xaxis-avatar__img--vague:hover {
  border-color: #ABB5BB;
}

.hc-xaxis-avatar__img--past-top-pick:hover {
  border-color: #18B1FF;
}

.hc-xaxis-avatar__img--don-t-buy:hover,
.hc-xaxis-avatar__img--sell:hover,
.hc-xaxis-avatar__img--short:hover {
  border-color: #FF3B43;
}

.hc-xaxis-avatar__img--hold:hover,
.hc-xaxis-avatar__img--watch:hover,
.hc-xaxis-avatar__img--wait:hover {
  border-color: #FF7F2F;
}

.hc-xaxis-avatar__img--buy-on-weekness:hover,
.hc-xaxis-avatar__img--partial-buy:hover,
.hc-xaxis-avatar__img--speculative-buy:hover {
  border-color: #18DB88;
}

.hc-xaxis-avatar__img--partial-sell:hover,
.hc-xaxis-avatar__img--partial-sell:hover {
  background-color: #FF452A;
}

.xaxis_avatar_details {
  width: 200px;
  position: absolute;
  right: -75px;
  z-index: 14;
  bottom: 70px;
  padding: 10px;
  background: #FFFFFF;
  box-shadow: 0 4px 14px 0 rgba(0,0,0,0.14);
}

.top_arrow_xaxis_avatar::after {
  border-style: solid;
  border-color: transparent transparent rgb(244, 244, 244) transparent;
  border-width: 9px;
  content: '';
  display: block;
  position: absolute;
  top: -18px;
  left: 125px;
  width: 0;
  height: 0;
}

.top_arrow_xaxis_avatar::before {
  border-style: solid;
  border-color: transparent transparent rgb(226, 229, 241) transparent;
  border-width: 10px;
  content: '';
  display: block;
  position: absolute;
  top: -20px;
  left: 124px;
  width: 0;
  height: 0;
}

.hc-tooltip__container {
  display: block;
  position: relative;
  margin-bottom: 18px;
}

.hc-tooltip__content {
  display: flex;
  align-items: center;
  position: relative;
}

.hc-tooltip__avatar {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  box-shadow: 0 5px 11px 0 rgba(0,0,0,0.11);
}

.hc-tooltip__expert-info {
  margin-left: 8px;
}

.hc-tooltip__expert-name {
  margin: 0;
  white-space: nowrap;
  width: 140px;
  font-size: 16px;
  color: #25292B;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hc-tooltip__expert-title {
  margin: 0;
  color: #ABB3B9;
  white-space: nowrap;
  width: 140px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hc-tooltip__opinion-comment {
  width: 100%;
  height: 52px;
  margin: 8px 0;
  font-size: 14px;
  color: #80898F;
  line-height: 17px;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.xaxis_avatar_details .carousel-indicators {
  bottom: -28px;
}

.xaxis_avatar_details .carousel-indicators li {
  background-color: rgba(122,131,137,0.36);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-left: 2px;
  margin-right: 2px;
}

.xaxis_avatar_details .carousel-indicators li.active {
  background-color: #25292B;
}

.hc-tooltip__signal-badge {
  position: absolute;
  top: 25px;
  left: 27px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ABB5BB;
}

.hc-tooltip__signal-badge--buy,
.hc-tooltip__signal-badge--week-buy {
  background-color: #18DB88;
}

.hc-tooltip__signal-badge--strong-buy {
  background-color: #5CE23F;
}

.hc-tooltip__signal-badge--top-pick {
  background-color: #178DFF;
}

.hc-tooltip__signal-badge--comment,
.hc-tooltip__signal-badge--n-a,
.hc-tooltip__signal-badge--unspecified,
.hc-tooltip__signal-badge--vague {
  background-color: #ABB5BB;
}

.hc-tooltip__signal-badge--past-top-pick {
  background-color: #18B1FF;
}

.hc-tooltip__signal-badge--don-t-buy,
.hc-tooltip__signal-badge--sell,
.hc-tooltip__signal-badge--short {
  background-color: #FF3B43;
}

.hc-tooltip__signal-badge--hold,
.hc-tooltip__signal-badge--watch,
.hc-tooltip__signal-badge--wait {
  background-color: #FF7F2F;
}

.hc-tooltip__signal-badge--buy-on-weekness,
.hc-tooltip__signal-badge--partial-buy,
.hc-tooltip__signal-badge--speculative-buy {
  background-color: #18DB88;
}

.hc-tooltip__signal-badge--partial-sell,
.hc-tooltip__signal-badge--partial-sell {
  background-color: #FF452A;
}

.highcharts-axis-labels > span {
  width: 42px !important;
  overflow: unset !important;
}

.hc-tooltip__signal-name {
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
  background-color: #ABB5BB;
}

.hc-tooltip__signal-name--buy,
.hc-tooltip__signal-name--week-buy {
  background-color: #18DB88;
}

.hc-tooltip__signal-name--strong-buy {
  background-color: #5CE23F;
}

.hc-tooltip__signal-name--top-pick {
  background-color: #178DFF;
}

.hc-tooltip__signal-name--comment,
.hc-tooltip__signal-name--n-a,
.hc-tooltip__signal-name--unspecified,
.hc-tooltip__signal-name--vague {
  background-color: #ABB5BB;
}

.hc-tooltip__signal-name--past-top-pick {
  background-color: #18B1FF;
}

.hc-tooltip__signal-name--don-t-buy,
.hc-tooltip__signal-name--sell,
.hc-tooltip__signal-name--short {
  background-color: #FF3B43;
}

.hc-tooltip__signal-name--hold,
.hc-tooltip__signal-name--watch,
.hc-tooltip__signal-name--wait {
  background-color: #FF7F2F;
}

.hc-tooltip__signal-name--buy-on-weekness,
.hc-tooltip__signal-name--partial-buy,
.hc-tooltip__signal-name--speculative-buy {
  background-color: #18DB88;
}

.hc-tooltip__signal-name--partial-sell,
.hc-tooltip__signal-name--partial-sell {
  background-color: #FF452A;
}

.highcharts-axis-labels.highcharts-xaxis-labels > span:hover {
  z-index: 99;
}

.hc-tooltip__opinion-link {
  margin-top: -8px;
  margin-bottom: 8px;
}

.hc-tooltip__date {
  position: absolute;
  bottom: 2px;
  right: 0;
}

.company-profile-chart {
  text-align: center;
  height: 250px;
  width: 100%;

  &.active {
    background: #F7F7F7;
  }

  &:not(.active) {
    text-align: center;
    color: red;
  }
}

.container-stockchart {
  position: relative;
  cursor: pointer;
}

.container-stockchart.is--loading {
  cursor: auto;
}

.container-stockchart.is--loading:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  border: 2px solid #fc3e49;
  border-top-color: transparent;
  border-radius: 50%;

  -webkit-animation: chart-loading-spinner 2s linear infinite;
  animation: chart-loading-spinner 2s linear infinite;
}

@keyframes chart-loading-spinner {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@-webkit-keyframes chart-loading-spinner {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.container-stockchart-small {
  width: 100%;
  min-width: 170px;
  height: 280px;
  opacity: 1;
  transition: opacity .5s linear;
}

.container-expert-stockchart-small {
  width: 100%;
  min-width: 170px;
  height: 135px;
  opacity: 1;
  transition: opacity .5s linear;
}

.container-stockchart.is--loading .container-stockchart-small {
  opacity: 0;
}

.container-stockchart-small > .highcharts-container {
  margin-left: auto;
  margin-right: auto;
  width: 100%!important;
  height: 280px!important;
}

.container-stockchart-small > .highcharts-container > .highcharts-root {
  height: 280px;
  width: 100%;
}

.container-stockchart-small > .highcharts-container > .highcharts-root {
  & > .highcharts-background {
    height: 280px;
    width: 100%;
  }

  & .highcharts-plot-background {
    width: 466px!important;
    height: 163px!important;
  }
}

.container-stockchart-big {
  display: none;
  min-width: 650px;
  min-height: 375px;
  border: 1px solid #ABB3B9;
  border-radius: 4px;
}

.fancybox-slide .container-stockchart-big {
  box-sizing: border-box;
  padding: 30px;
  margin: 0;
}
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

</style>
