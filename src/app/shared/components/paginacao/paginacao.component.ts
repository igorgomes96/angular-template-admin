import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagedResult } from '@shared/models/paged-result';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit {

  pages: number[] = [];

  // tslint:disable-next-line:variable-name
  private paginationInfo: PagedResult<any>;

  @Input() mostrarRegistrosPorPagina = true;
  @Input() quantidadePaginas = 5;
  @Input() tamanhosDisponiveis = [5, 10, 25, 50, 100, 200];
  @Input()
  set dadosPaginados(pageResult: PagedResult<any>) {
    if (pageResult && !pageResult.currentPage) {
      this.paginationInfo.currentPage = 1;
      return;
    }
    this.paginationInfo = pageResult;
    this.pages = [];
    if (pageResult && pageResult.pageCount > 1) {
      for (let i = 1; i <= pageResult.pageCount; i++) {
        this.pages.push(i);
      }
    }

    if (pageResult && pageResult.pageCount && pageResult.currentPage > pageResult.pageCount) {
      // Se a página corrente for maior que a quantidade de páginas
      this.paginationInfo.currentPage = pageResult.pageCount;
      this.alterarPagina.emit(this.paginationInfo.currentPage);
    }

  }

  get dadosPaginados(): PagedResult<any> {
    if (!this.paginationInfo) {
      return {
        currentPage: 1,
        pageCount: 0,
        pageSize: 5,
        result: [],
        totalRecords: 0
      };
    }
    return this.paginationInfo;
  }

  @Output() alterarPagina = new EventEmitter<number>();
  @Output() alterarTamanhoPagina = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {

  }

  anterior() {
    if (this.dadosPaginados.currentPage > 1) {
      this.dadosPaginados.currentPage--;
      this.alterarPagina.emit(this.dadosPaginados.currentPage);
    }
  }

  proximo() {
    if (this.dadosPaginados.currentPage < this.dadosPaginados.pageCount) {
      this.dadosPaginados.currentPage++;
      this.alterarPagina.emit(this.dadosPaginados.currentPage);
    }
  }

  primeiro() {
    this.dadosPaginados.currentPage = 1;
    this.alterarPagina.emit(this.dadosPaginados.currentPage);
  }

  ultimo() {
    this.dadosPaginados.currentPage = this.dadosPaginados.pageCount;
    this.alterarPagina.emit(this.dadosPaginados.currentPage);
  }

  mudaPagina(page: number) {
    if (this.dadosPaginados.currentPage !== page) {
      this.dadosPaginados.currentPage = page;
      this.alterarPagina.emit(page);
    }
  }

  get startPage(): number {
    const tamanhoPages = this.quantidadePaginas % 2 ? this.quantidadePaginas + 1 : this.quantidadePaginas;
    let startPage = this.paginationInfo.currentPage - (tamanhoPages / 2);
    if (startPage < 0) { return 0; }
    if ((startPage + this.quantidadePaginas) > this.paginationInfo.pageCount) {
      startPage = this.paginationInfo.pageCount - this.quantidadePaginas;
    }
    if (startPage < 0) { return 0; }
    return startPage;
  }

  get endPage(): number {
    return this.startPage + this.quantidadePaginas;
  }

  isPageActive(page: number) {
    return this.dadosPaginados.currentPage === page;
  }

  mudaTamanhoPagina(tamanhoPagina: number) {
    this.alterarTamanhoPagina.emit(tamanhoPagina);
  }

}
