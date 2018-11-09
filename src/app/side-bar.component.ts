import { Component, OnInit } from '@angular/core';

import { Menu } from './models/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {
  public menus = [
    new Menu({id: 1, url: '/', label: 'Archive'}),
    new Menu({id: 2, url: '/e/new', label: 'Write'}),
  ];

  ngOnInit () {
    console.log(this.menus);
  }

}
