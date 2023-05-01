import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiGuardian } from '@core/guards/api-guardian.service';
import { FetchDataComponent } from '@app/weather/components/fetch-data/fetch-data.component';

const routes: Routes = [
  {
    path: 'list',
    component: FetchDataComponent,
    canActivate: [ApiGuardian],
    data: { requiredRoles: ['admin', 'user'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
