import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject = new BehaviorSubject<MenuItem[]>([]);

  constructor() { }

  public menu(): Observable<MenuItem[]> {
    return this.menuSubject.asObservable();
  }

  public atualizarMenu(menu: MenuItem[]) {
    setTimeout(() => {
      this.menuSubject.next(menu);
    }, 100);
  }
}
