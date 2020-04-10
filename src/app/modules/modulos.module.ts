import { NgModule } from '@angular/core';

import { ModulosRoutingModule } from './modulos-routing.module';
import { ModulosComponent } from './modulos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [ModulosComponent, DashboardComponent],
  imports: [
    SharedModule,
    ModulosRoutingModule
  ]
})
export class ModulosModule { }
