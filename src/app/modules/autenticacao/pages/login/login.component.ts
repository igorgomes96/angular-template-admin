import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { MensagensService } from '@shared/services/mensagens.service';
import { AutenticacaoService } from '@shared/services/autenticacao.service';
import { Usuario } from '@shared/models/usuario';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loggingOn = false;
  redirectTo = '/';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: MensagensService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
    this.route.queryParamMap
      .pipe(
        filter(params => params.has('redirectTo'))
      ).subscribe(params => this.redirectTo = params.get('redirectTo'));
  }

  login() {
    this.loggingOn = true;
    const usuario = this.form.value as Usuario;
    this.autenticacaoService.login(usuario)
      .pipe(finalize(() => this.loggingOn = false))
      .subscribe(_ => {
        this.toast.exibirNotificacao({
          message: 'Login realizado com Sucesso!'
        });
        this.router.navigate([this.redirectTo]);
      });
  }
}
