import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaoEncontradoComponent } from '@shared/components/nao-encontrado/nao-encontrado.component';
import { NavigationType } from './app.component';
import { SemAcessoComponent } from '@shared/components/sem-acesso/sem-acesso.component';

const routes: Routes = [
    {
        path: 'naoencontrado', component: NaoEncontradoComponent,
        data: {
            navigationType: NavigationType.None
        }
    },
    {
        path: 'semacesso', component: SemAcessoComponent,
        data: {
            navigationType: NavigationType.None
        }
    },
    {
        path: 'autenticacao',
        data: {
            mostrarFooter: false,
            navigationType: NavigationType.None
        },
        loadChildren: () => import('./modules/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
    },
    {
        path: 'modulos',
        data: {
            titulo: 'Módulos'
        },
        loadChildren: () => import('./modules/modulos.module').then(m => m.ModulosModule)
    },
    { path: '', redirectTo: 'modulos', pathMatch: 'full' },
    { path: '**', redirectTo: '/naoencontrado' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
