import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Menu } from './menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  linksMenu: Menu[];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(){
    this.linksMenu = this.menuService.getMenu();
  }

}
