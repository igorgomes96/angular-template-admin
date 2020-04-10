import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { RouterModule } from '@angular/router';
import { PainelComponent } from './components/painel/painel.component';
import { NaoEncontradoComponent } from './components/nao-encontrado/nao-encontrado.component';
import { SemAcessoComponent } from './components/sem-acesso/sem-acesso.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';
import { AjudaTooltipComponent } from './components/ajuda-tooltip/ajuda-tooltip.component';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    PainelComponent,
    NaoEncontradoComponent,
    SemAcessoComponent,
    CustomInputComponent,
    ValidatorMessageComponent,
    PaginacaoComponent,
    AjudaTooltipComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LaddaModule,
    RouterModule,
    TooltipModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LaddaModule,
    RouterModule,
    PainelComponent,
    NaoEncontradoComponent,
    SemAcessoComponent,
    CustomInputComponent,
    ValidatorMessageComponent,
    PaginacaoComponent,
    AjudaTooltipComponent,
    TooltipModule
  ]
})
export class SharedModule { }
