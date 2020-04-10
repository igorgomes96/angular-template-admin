import { NgModule } from '@angular/core';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { EsqueciMinhaSenhaComponent } from './pages/esqueci-minha-senha/esqueci-minha-senha.component';
import { VerifiqueEmailComponent } from './pages/verifique-email/verifique-email.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';


@NgModule({
  declarations: [LoginComponent, EsqueciMinhaSenhaComponent, VerifiqueEmailComponent, RedefinirSenhaComponent],
  imports: [
    SharedModule,
    AutenticacaoRoutingModule
  ]
})
export class AutenticacaoModule { }
