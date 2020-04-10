import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulosComponent } from './modulos.component';
import { NavigationType } from '../app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ModulosComponent,
    data: {
      navigationType: NavigationType.Top
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      navigationType: NavigationType.Left,
      titulo: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
