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
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://monitor.lkh.coffee:4200/',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'}),
  };

  constructor(private httpClient: HttpClient) {
    console.log('WeatherForecastService');
  }

  public list(countryCode:string, regionCode:string, cityName:string): Observable<WeatherForecast[]> {
    return this.httpClient.get<WeatherForecast[]>(
      this.weatherMonitoringBaseUri + `weather?country=${countryCode}&state=${regionCode}&city=${cityName}`,
      this.httpOptions
    );
  }

  public update(countryCode:string, regionCode:string, cityName:string): Observable<WeatherForecast[]> {
    return this.httpClient.patch<any>(
      this.weatherMonitoringBaseUri + `weather?country=${countryCode}&state=${regionCode}&city=${cityName}`,
      this.httpOptions
    );
  }

  public delete(countryCode:string, regionCode:string, cityName:string): Observable<any> {
    return this.httpClient.delete<any>(
      this.weatherMonitoringBaseUri + `weather?country=${countryCode}&state=${regionCode}&city=${cityName}`,
      this.httpOptions
    );
  }
}
