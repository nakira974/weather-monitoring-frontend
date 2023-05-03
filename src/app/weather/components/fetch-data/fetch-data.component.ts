import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, Plugin } from 'chart.js/auto';
import { WeatherForecast } from '@core/models/weatherforecast';
import {WeatherForecastService} from "@core/services/weather-forecast.service";
import { DateFormatPipe } from './date-format.pipe';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent {
  public countryCode: string = '';
  public regionCode: string = '';
  public cityName: string = '';
  public forecasts: WeatherForecast[] = [];
  public dateFormatPipe = new DateFormatPipe();
  private weatherForecastChart: Chart | null = null;


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

  constructor(
    private http: HttpClient,
    private forecastService : WeatherForecastService
  ) {
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.createChart();
    });
  }


  getForecasts(countryCode: string, regionCode: string, cityName: string) {
    this.forecastService.list(countryCode, regionCode, cityName).subscribe(
      (result) => {
        this.forecasts = result;
        if (!this.weatherForecastChart) {
          this.createChart();
        } else {
          this.updateChart();
        }
      },
      (error) => console.error(error)
    );
  }

  public update(countryCode:string, regionCode:string, cityName:string): void {
    this.forecastService.update(countryCode, regionCode, cityName).subscribe(
      (result) => {
        console.log('Weather forecast updated:', result);
        this.clearChart();
      },
      (error) => console.error(error)
    );
  }

  public delete(countryCode:string, regionCode:string, cityName:string): void {
    this.forecastService.delete(countryCode, regionCode, cityName).subscribe(
      (result) => {
        console.log('Weather forecast deleted:', result);
        this.forecasts = [];
        this.clearChart();
      },
      (error) => console.error(error)
    );
  }

  private createChart = () => {
    const weatherForecastChart = <HTMLCanvasElement>(
      document.getElementById('forecasts')
    );
    const ctx = <CanvasRenderingContext2D>(
      weatherForecastChart.getContext('2d')
    );
    Chart.register({
      id: 'chartAreaBorder',
    });
    this.weatherForecastChart = new Chart(ctx, {
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
        labels: this.forecasts.map((row) => this.dateFormatPipe.transform(row.date)),
        datasets: [
          {
            label: 'Évolution de la température',
            data: this.forecasts.map((row) => row.temperatureF),
          },
        ],
      },
    });
  }

  private updateChart() {
    const labels = this.forecasts.map((row) =>
      this.dateFormatPipe.transform(row.date)
    );
    const data = this.forecasts.map((row) => row.temperatureF);
    if (this.weatherForecastChart) {
      this.weatherForecastChart.data.labels = labels;
      this.weatherForecastChart.data.datasets[0].data = data;
      this.weatherForecastChart.update();
    }
  }

  private clearChart() {
    if (this.weatherForecastChart) {
      this.weatherForecastChart.destroy();
    }
    const weatherForecastChart = <HTMLCanvasElement>(
      document.getElementById('forecasts')
    );
    const ctx = <CanvasRenderingContext2D>(
      weatherForecastChart.getContext('2d')
    );
    ctx.clearRect(0, 0, weatherForecastChart.width, weatherForecastChart.height);
  }
}
