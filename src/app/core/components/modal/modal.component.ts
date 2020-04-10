import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  exibirModal = false;
  template: TemplateRef<any>;
  titulo: string = null;
  private subscription = new Subscription();
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscription.add(this.modalService.aoExibirModal
      .subscribe((templateValue: any) => {
        if (!templateValue) {
          this.exibirModal = templateValue;
        } else {
          this.exibirModal = true;
          this.template = templateValue.template;
          this.titulo = templateValue.titulo;
        }
      }));
  }

  closeModal() {
    this.modalService.fecharModal();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
