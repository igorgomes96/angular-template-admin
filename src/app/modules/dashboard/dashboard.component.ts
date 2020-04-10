import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.atualizarMenu(
      [
        {
          label: 'Dashboard',
          icon: 'fa fa-dashboard',
          link: '/modulos/dashboard',
          visible: true
        },
        {
          label: 'Voltar',
          icon: 'fa fa-chevron-left',
          link: '/modulos',
          visible: true
        }
      ]
    );
  }

  ngAfterViewInit(): void {

  }



}
