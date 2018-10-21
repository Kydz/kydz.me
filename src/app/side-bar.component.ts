import { Component, OnInit } from '@angular/core';

import { Menu } from './models/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {
  public menus = [];
  private menu;

  ngOnInit () {
    this.getMenus();
  }

  getMenus(): void {
    this.menu = new Menu();
    this.menu.id = 1;
    this.menu.url = '/';
    this.menu.label = 'Archive';
    this.menus.push(this.menu);
  }
}
