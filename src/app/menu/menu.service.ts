import { Injectable } from '@angular/core';
import { Menu } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  linksMenu: Menu[] = [
    { path: '/films', label: 'Все фильмы', active: 'active', icon: 'list_alt'},
    { path: '/people', label: 'Актеры', active: 'active', icon: 'list_alt'},
    { path: '/not-found', label: 'Not found', active: 'active', icon: 'commute'},
  ];

  constructor() { }
  
  getMenu(){
    return this.linksMenu;
  }

}