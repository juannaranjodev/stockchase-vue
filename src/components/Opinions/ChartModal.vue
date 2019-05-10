<template>
  <b-modal
    id="modal_opinion_chart"
    ref="chartModal"
    modal-class="opinion-chart-modal"
    size="lg"
    centered
    hide-footer
    @hide="onModalHidden"
  >
    <div
      v-if="data"
      ref="chartContainer"
      class="container-stockchart is--loading"
    >
      <div class="container-stockchart-big" />
    </div>
  </b-modal>
</template>

<script>
/* eslint-disable */
import $ from 'jquery';
import Highcharts from 'highcharts';

export default {
  name: 'ChartModal',

  data() {
    return {
      data: null,
    };
  },

  watch: {
    data(data) {
      if (!data) return;

      this.$nextTick(() => {
        this.renderChart();
      });
    }
  },

  methods: {
    setupChart(data) {
      this.data = data;
    },

    hideModal(e) {
      if (e) e.preventDefault();
      this.$refs.chartModal.hide();
    },

    onModalHidden() {
      // Reset data to guarantee re-rendering next time the modal is opened
      this.data = null;
    },

    renderChart() {
      const $containerStockchart = $(this.$refs.chartContainer);

      var stockchart = {
        init: function (data, $containerStockchart) {
          var $containerStockchartBig = $containerStockchart.find('> .container-stockchart-big');

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
              renderTo: $containerStockchartBig[0],
            },
            title: {
              text: chartData.company_name + ' (' + chartData.company_symbol + ')<br>' + chartData.title,
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

      stockchart.init(this.data, $containerStockchart);

      $containerStockchart.removeClass('is--loading');
    }
  },
};
/* eslint-enable */
</script>

<style lang="stylus">
.opinion-chart-modal
  .modal-header
    border-bottom 0
    padding-bottom 0

  .modal-body
    padding-top 0

</style>
