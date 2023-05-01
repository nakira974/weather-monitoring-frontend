import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, Plugin } from 'chart.js/auto';
import { WeatherForecast } from '@core/models/weatherforecast';
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  public chartAreaBorder: Plugin = {
    id: 'chartAreaBorder',

    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;

      ctx.save();
      ctx.strokeStyle = options['borderColor'];
      ctx.lineWidth = options['borderWidth'];
      ctx.setLineDash(options['borderDash'] || []);
      ctx.lineDashOffset = options['borderDashOffset'];
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  constructor(http: HttpClient) {
    http
      .get<WeatherForecast[]>(
        'https://monitor.lkh.coffee:8083/weather?city=Abbeville&country=US&state=LA'
      )
      .subscribe(
        (result) => {
          this.forecasts = result;
          const weatherForecastChart = <HTMLCanvasElement>(
            document.getElementById('forecasts')
          );
          const ctx = <CanvasRenderingContext2D>(
            weatherForecastChart.getContext('2d')
          );
          Chart.register({
            id: 'chartAreaBorder',
          });
          new Chart(ctx, {
            type: 'line',
            plugins: [this.chartAreaBorder],
            options: {
              animations: {
                tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true,
                },
              },
              scales: {
                y: {
                  // defining min and max so hiding the dataset does not change scale range
                  min: 0,
                  max: 135,
                },
              },
              plugins: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                chartAreaBorder: {
                  borderColor: 'red',
                  borderWidth: 2,
                  borderDash: [5, 5],
                  borderDashOffset: 2,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.dataset.label || '';

                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += `${((context.parsed.y - 32) * 5) / 9}°C`;
                      }
                      return label;
                    },
                  },
                },
              },
            },
            data: {
              labels: this.forecasts.map((row) => row.date),
              datasets: [
                {
                  label: 'Évolution de la température',
                  data: this.forecasts.map((row) => row.temperatureF),
                },
              ],
            },
          });
        },
        (error) => console.error(error)
      );
  }
}
