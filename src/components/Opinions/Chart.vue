<template>
  <div class="opinion-chart">
    <div
      v-if="user.loaded && !loggedIn"
      class="chart-login"
    >
      <a href="/member/signup">Sign up</a> or <a href="/member/login">Log in</a>
      to enjoy full view of charts.
    </div>
    <div
      v-if="user.loaded && loggedIn && !chartEnabled"
      class="chart-opt-in"
    >
      <a href="/profile">Must opt-in to use chart</a>
    </div>
    <div
      v-if="user.loaded && chartEnabled && isMarketComment"
      class="chart-unavailable"
    >
      N/A
    </div>
    <div
      v-if="user.loaded && chartEnabled && !isMarketComment"
      ref="chartContainer"
      class="container-stockchart is--loading"
    >
      <div class="container-expert-stockchart-small" />
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

export default {
  name: 'Chart',

  props: {
    company: {
      type: Object,
      default: () => ({}),
    },
    date: {
      type: String,
      default: ''
    },
  },

  computed: {
    ...mapGetters(['user', 'loggedIn']),

    isMarketComment() {
      return this.company.id === 1970;
    },

    chartEnabled() {
      return this.loggedIn && this.user.Meta.chart_enabled;
    },

    fromDate() {
      return moment(this.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    },
  },

  watch: {
    user(user) {
      if (!user.loaded || !user.Meta || !user.Meta.chart_enabled) return;

      this.$nextTick(() => this.renderChart());
    },
  },

  methods: {
    showChart(data) {
      this.$emit('showChart', data);
    },

    renderChart() {
      const baseUrl = APP_URL || window.location.origin;
      const $containerStockchart = $(this.$refs.chartContainer);
      const companyId = this.company.id;
      const fromDate = this.fromDate;
      const showChart = this.showChart;

      var stockchart = {
        init: function (data, $containerStockchart) {
          var $containerStockchartSmall = $containerStockchart.find('> .container-expert-stockchart-small');

          var stockchartTitle = data.title ? data.title : '';
          var stockchartCompanyName = data.company_name ? data.company_name : '';
          var stockchartCompanySymbol = data.company_symbol ? data.company_symbol : '';
          var stockchartSubtitle = data.subtitle ? data.subtitle : '';
          var stockchartData = data.data;
          var stockchartXAxisLabel = data.xaxis_label;
          var chartData = {};

          // Handle chart when data series empty
          if (typeof stockchartData == 'undefined') {

            stockchartData = [0, 100]

          }

          // Handle chart X axis label
          if (typeof stockchartXAxisLabel != 'undefined') {

            stockchartXAxisLabel = stockchartXAxisLabel.split(', ');

          }
          else stockchartXAxisLabel = [''];

          chartData = {
            company_name: stockchartCompanyName,
            company_symbol: stockchartCompanySymbol,
            title: stockchartTitle,
            subtitle: stockchartSubtitle,
            data: stockchartData,
            xaxisLabel: stockchartXAxisLabel,
            xaxisLabelStep: data.data.length > 9 ? parseInt(data.data.length / 5) : (data.data.length ? data.data.length : 0)
          }

          Highcharts.chart({
            chart: {
              renderTo: $containerStockchartSmall[0],
              ignoreHiddenSeries: false,
              backgroundColor: '#F7F7F7',
            },
            title: {
              text: chartData.title,
              style: {
                color: chartData.data.length ? '#25292B' : '#FF0000',
                fontSize: '12px',
              },
            },
            subtitle: {
              text: chartData.subtitle,
              style: {
                fill: '#6F7980',
                fontSize: '10px',
              },
            },
            tooltip: {
              enabled: false,
            },
            xAxis: {
              categories: chartData.xaxisLabel,
              labels: {
                step: chartData.xaxisLabelStep ? chartData.xaxisLabelStep : null,
              },
              tickmarkPlacement: 'on',
              // tickWidth: 0,
            },
            yAxis: {
              title: {
                text: 'Price',
                enabled: false,
              },
              alternateGridColor: '#f6f7f9',
              gridLineWidth: 0,
              labels: {},
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


          // // Init stock chart click event
          $containerStockchart.on('click', function () {
            if (data.data.length) showChart(data);
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

          return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear().toString().substr(-2);
        },
      };

      // TODO reimplement this ajax endpoint in v2
      $.ajax({
        url: baseUrl + '/ajax/company/' + companyId + '/fromdate-expert/' + fromDate,
      }).done(function (data) {

        // If data empty
        // if( !data.data.length ) return false;

        var chart_data_length = data.data.length;
        var first_data = data.data[0];
        var last_data = data.data[data.data.length - 1];

        if (data.data.length > 0) {
          var company_name = data.data[0].company_name;
          var company_symbol = data.data[0].company_symbol;
        }

        var chart_data = {
          company_name: company_name,
          company_symbol: company_symbol,
          title: chart_data_length ? chart_data_length + ' Data Points' : 'Data not available',
          subtitle: chart_data_length ? stockchart.convert_date(first_data.date) + ' - ' + stockchart.convert_date(last_data.date) : '',
          data: [],
          xaxis_label: '',
        };

        for (var i = 0; i < chart_data_length; i++) {

          chart_data['data'].push(parseFloat(data.data[i].price));
          chart_data['xaxis_label'] += stockchart.convert_date(data.data[i].date) + (i < (chart_data_length - 1) ? ', ' : '');

        }

        // Init chart
        stockchart.init(chart_data, $containerStockchart);

        $containerStockchart.removeClass('is--loading');
      });
    }
  },
};
/* eslint-enable */
</script>

<style lang="stylus" scoped>
.opinion-chart
  flex 1

.chart-unavailable
  font-size 1.2em
  line-height 1.25
  text-align center

.chart-login
  background url("~assets/images/blur_chart_image.png")
  background-size cover
  padding 10px
  font-size 16px
  text-align center

  a
    color red
    text-decoration underline

.chart-opt-in
  font-size 16px
  text-align center
  a
    color red
    text-decoration underline

</style>
