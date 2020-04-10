import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from '@shared/services/autenticacao.service';
import { Router } from '@angular/router';
import { ToastType } from '@core/components/toasts/toasts.component';
import { MensagensService } from '@shared/services/mensagens.service';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private mensagensService: MensagensService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  solicitarReset() {
    this.autenticacaoService.resetarSenha(this.form.get('email').value)
    .subscribe(_ => {
      this.mensagensService.exibirNotificacao({
        message: 'Enviamos para seu e-mail um link para reset da senha.'
      });
      this.router.navigate(['/autenticacao/verifiqueemail']);
    });
  }

}
