import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MenuItem } from 'src/app/shared/models/menu-item';

declare var $: any;

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  menu$: Observable<MenuItem[]>;
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menu$ = this.menuService.menu();
  }


}
