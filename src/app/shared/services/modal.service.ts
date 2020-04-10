import { Injectable, EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModalEmitter = new EventEmitter<any>();
  constructor() { }

  get aoExibirModal(): Observable<any> {
    return this.showModalEmitter.asObservable();
  }

  exibirModal(template: TemplateRef<any>, titulo = null) {
    this.showModalEmitter.emit({ template, titulo });
  }

  fecharModal() {
    this.showModalEmitter.emit(false);
  }
}
