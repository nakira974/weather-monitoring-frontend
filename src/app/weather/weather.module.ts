import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { FormsModule } from '@angular/forms';
import {FetchDataComponent} from "@app/weather/components/fetch-data/fetch-data.component";


@NgModule({
  declarations: [
    FetchDataComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    FormsModule
  ]
})
export class WeatherModule { }
