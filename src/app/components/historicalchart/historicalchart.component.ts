import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { R3TargetBinder } from '@angular/compiler';
import IndicatorsCore from 'highcharts/indicators/indicators';
import vbp from 'highcharts/indicators/volume-by-price';
IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-historicalchart',
  templateUrl: './historicalchart.component.html',
  styleUrls: ['./historicalchart.component.css'],
})
export class HistoricalchartComponent implements OnInit {
  @Input() ticker;
  HighchartsHC: typeof Highcharts = Highcharts;
  chartOptionsHC: {};
  HighchartsHC0: typeof Highcharts = Highcharts;
  chartOptionsHC0: {};
  groupingUnits = [
    ['week', [1]],
    ['month', [1, 2, 3, 4, 6]],
  ];

  constructor() {}

  ngOnInit(): void {
    let startdate = new Date().toISOString().slice(0, 10);
    const url =
      'https://stock-search-nodejs-be.wl.r.appspot.com/historicalchart/' +
      this.ticker;

    fetch(url).then((response) => {
      response.json().then((data) => {
        var stkprice = [];
        var volume = [];
        for (var i = 0; i < data.length; i++) {
          let d = new Date(data[i].date);
          let UTCdate = Date.UTC(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
          );
          stkprice[i] = [
            UTCdate,
            data[i].open,
            data[i].high,
            data[i].low,
            data[i].close,
          ];
          volume[i] = [UTCdate, data[i].volume];

          console.log(stkprice);
        }
        this.chartOptionsHC = {
          title: {
            text: this.ticker + ' Historical',
          },
          subtitle: {
            text: 'With SMA and Volume by Price technical indicators',
          },
          navigator: {
            enabled: true,
          },
          rangeSelector: { selected: 2 },
          yAxis: [
            {
              startOnTick: false,
              endOnTick: false,
              labels: {
                align: 'right',
                x: -3,
              },
              title: {
                text: 'OHLC',
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                enabled: true,
              },
            },
            {
              labels: {
                align: 'right',
                x: -3,
              },
              title: {
                text: 'Volume',
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2,
            },
          ],

          tooltip: {
            split: true,
          },

          plotOptions: {
            series: {
              dataGrouping: {
                units: this.groupingUnits,
              },
            },
          },

          series: [
            {
              type: 'candlestick',
              name: this.ticker,
              id: this.ticker,
              zIndex: 2,
              data: stkprice,
            },
            {
              type: 'column',
              name: 'Volume',
              id: 'volume',
              data: volume,
              yAxis: 1,
              // pointWidth: 2,
            },
            {
              type: 'vbp',
              linkedTo: this.ticker,
              params: {
                volumeSeriesID: 'volume',
              },
              dataLabels: {
                enabled: false,
              },
              zoneLines: {
                enabled: false,
              },
            },
            {
              type: 'sma',
              linkedTo: this.ticker,
              zIndex: 1,
              marker: {
                enabled: false,
              },
            },
          ],
        };
      });
    });
  }
}
