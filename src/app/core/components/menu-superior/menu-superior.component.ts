import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Router } from '@angular/router';
import { smoothlyMenu } from 'src/app.helpers';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/shared/models/menu-item';
import { AutenticacaoService } from '@shared/services/autenticacao.service';

declare var $: any;

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  @Input() mostrandoMenuLateral = true;
  topCollapsed = true;
  menu$: Observable<MenuItem[]>;

  constructor(
    private router: Router,
    public menuService: MenuService,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.menu$ = this.menuService.menu();
  }

  logout() {
    this.autenticacaoService.logout();
    this.router.navigate(['/autenticacao/login']);
  }

  menuClick(_) {
    if (!this.topCollapsed) {
      this.topCollapsed = true;
    }
  }

  toggleNavigation(): void {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

}
