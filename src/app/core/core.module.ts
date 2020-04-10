import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { MenuSuperiorComponent } from './components/menu-superior/menu-superior.component';
import { SharedModule } from '@shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuLateralComponent,
    MenuSuperiorComponent,
    BreadcrumbComponent,
    ToastsComponent,
    ModalComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FooterComponent,
    MenuLateralComponent,
    MenuSuperiorComponent,
    ToastsComponent,
    ModalComponent
  ]
})
export class CoreModule { }
