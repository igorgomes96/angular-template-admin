import { Component, OnInit } from '@angular/core';
import { Usuario } from '@shared/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from '@shared/services/autenticacao.service';
import { map } from 'rxjs/operators';
import { MensagensService } from '@shared/services/mensagens.service';

@Component({
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  usuario: Usuario = { email: '' };
  codigoRecuperacao: string;
  constructor(
    private route: ActivatedRoute,
    private autenticacaoService: AutenticacaoService,
    private mensagensService: MensagensService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route.data
    //   .pipe(
    //     map(routeData => routeData.usuario)
    //   ).subscribe(usuario => {
    //     this.usuario = usuario;
    //   });

    this.route.params.subscribe(params => this.codigoRecuperacao = params.codigo);
  }

  redefinir() {
    this.usuario.codigoRecuperacao = this.codigoRecuperacao;
    this.autenticacaoService.cadastrarSenha(this.usuario)
      .subscribe(_ => {
        this.mensagensService.exibirNotificacao({
          message: 'Senha alterada com Sucesso!'
        });
        this.router.navigate(['/']);
      });
  }

}
