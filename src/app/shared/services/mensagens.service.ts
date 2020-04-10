import { Injectable, EventEmitter } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ToastMessage, ToastType } from '@core/components/toasts/toasts.component';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  private messageEmitter: EventEmitter<ToastMessage> = new EventEmitter<ToastMessage>();
  constructor() { }

  get notificacoes(): Observable<ToastMessage> {
    return this.messageEmitter.asObservable();
  }

  exibirNotificacao({ message, title = 'Sucesso', type = ToastType.success }) {
    this.messageEmitter.emit({ message, title, type });
  }

  solicitarConfirmacao(message: string, title = 'Tem certeza?'): Observable<any> {
    return from(swal({
      title,
      text: message,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }));
  }

  exibirModalErro(message: string, title = 'Ação inválida!'): Observable<any> {
    return from(swal({
      title,
      text: message,
      icon: 'warning'
    }));
  }
}
