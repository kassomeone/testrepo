import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IcApiMetadataComponent } from './ic/ic-api-metadata/ic-api-metadata.component';
import { IcMappingComponent } from './ic/ic-mapping/ic-mapping.component';
import { LookupValuesComponent } from './ic/lookup-values/lookup-values.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    canActivate: [AuthGuard],
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: 'ica/ic-mapping',
        component: IcMappingComponent
      },
      {
        path: 'ica/lookup-values',
        component: LookupValuesComponent
      },
      {
        path: 'ica/ic-api-metadata',
        component: IcApiMetadataComponent
      }


    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
