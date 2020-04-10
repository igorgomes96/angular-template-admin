import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuService } from '@shared/services/menu.service';
import { MensagensService } from '@shared/services/mensagens.service';
import { ModalService } from '@shared/services/modal.service';
import { PagedResult } from '@shared/models/paged-result';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {

  @ViewChild('modalTeste', { static: false }) modalTeste: TemplateRef<any>;

  constructor(
    private menuService: MenuService,
    private mensagensService: MensagensService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.menuService.atualizarMenu(
      [
        {
          label: 'Opção 1',
          link: '/modulos/dashboard',
          visible: true
        },
        {
          label: 'Opção 2',
          link: '/modulos',
          visible: true
        }
      ]
    );
  }

  exibirModal() {
    this.modalService.exibirModal(this.modalTeste, 'Teste');
  }

  exibirNotificacao() {
    this.mensagensService.exibirNotificacao({ message: 'Testando uma notificação.', title: 'Sucesso' });
  }

}
