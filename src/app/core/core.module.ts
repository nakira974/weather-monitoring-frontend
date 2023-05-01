import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from './services/keycloak.service';
import { WeatherForecastService } from './services/weather-forecast.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    KeycloakService,
    WeatherForecastService,
    MessageService,
    UserService,
  ],
})
export class CoreModule {}
