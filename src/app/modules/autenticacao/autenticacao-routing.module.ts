import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EsqueciMinhaSenhaComponent } from './pages/esqueci-minha-senha/esqueci-minha-senha.component';
import { VerifiqueEmailComponent } from './pages/verifique-email/verifique-email.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'esqueciminhasenha',
    component: EsqueciMinhaSenhaComponent
  },
  {
    path: 'verifiqueemail',
    component: VerifiqueEmailComponent
  },
  {
    path: 'redefinirsenha',
    component: RedefinirSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
