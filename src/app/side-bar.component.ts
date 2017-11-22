import { Component } from '@angular/core';

import { Menu } from "./menu";

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent {
  
  getMenus(): Menu[] {
    var menus = [],
    menu = new Menu();
    menu.id = 1;
    menu.url = 'archive';
    menu.label = 'Archive';
    menus.push(menu);
    return menus;
  }
}
