import { Component } from '@angular/core';

import { Menu } from './menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent {
  public menus;
  private menu;

  getMenus(): void {
    this.menu = new Menu();
    this.menu.id = 1;
    this.menu.url = 'archive';
    this.menu.label = 'Archive';
    this.menus.push(this.menu);
  }
}
