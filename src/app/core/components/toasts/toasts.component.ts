import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

declare var toastr: any;

export enum ToastType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}

export class ToastMessage {
  message: string;
  title: string;
  type?: ToastType;
}

@Component({
  selector: 'app-toasts',
  template: '',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent implements OnInit, OnDestroy {

  @Input() mensagem: EventEmitter<ToastMessage>;
  subscription = new Subscription();

  constructor() {
  }

  ngOnInit() {
    this.subscription.add(this.mensagem.subscribe((m: ToastMessage) => this.showMessage(m)));
  }

  showMessage({ message, title = 'Sucesso', type = ToastType.success }: ToastMessage) {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      timeOut: type === ToastType.error ? 10000 : 4000
    };
    toastr[ToastType[type]](message, title);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
