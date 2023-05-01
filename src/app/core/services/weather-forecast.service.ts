import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherForecast } from '@core/models/weatherforecast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  weatherMonitoringBaseUri = environment.weather_api;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    console.log('WeatherForecastService');
  }

  public list(): Observable<WeatherForecast[]> {
    return this.httpClient.get<WeatherForecast[]>(
      this.weatherMonitoringBaseUri + 'weather',
      this.httpOptions
    );
  }

  public detail(id: number): Observable<WeatherForecast> {
    return this.httpClient.get<WeatherForecast>(
      this.weatherMonitoringBaseUri + `detail/${id}`,
      this.httpOptions
    );
  }

  public create(weather: WeatherForecast): Observable<any> {
    return this.httpClient.post<any>(
      this.weatherMonitoringBaseUri + 'create',
      weather,
      this.httpOptions
    );
  }

  public update(id: number, weather: WeatherForecast): Observable<any> {
    return this.httpClient.put<any>(
      this.weatherMonitoringBaseUri + `update/${id}`,
      weather,
      this.httpOptions
    );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.weatherMonitoringBaseUri + `delete/${id}`,
      this.httpOptions
    );
  }
}
