import { User } from '@core/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = environment.weather_api;

  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public create(user: User): Observable<any> {
    return this.httpClient.post<any>(this.userURL + 'create', user, this.httpOptions);
  }
}
