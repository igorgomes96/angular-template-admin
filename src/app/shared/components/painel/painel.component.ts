import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

export interface PainelOpcao {
  nome: string;
  icon: string;
}

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PainelComponent implements OnInit {

  @Input() titulo: string;
  @Input() expansivel = true;
  @Input() texto: string;
  @Input() estilo = 'label-success';
  @Input() opcoes: PainelOpcao[];
  @Output() opcaoClick = new EventEmitter<PainelOpcao>();

  constructor() { }

  ngOnInit() {}

  collapse($event: { target: any; }) {
    const ibox = $($event.target).closest('div.ibox');
    const button = $(this).find('i');
    const content = ibox.children('.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(() => {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);
  }

  onOpcaoClick(option: PainelOpcao) {
    this.opcaoClick.emit(option);
  }

}
