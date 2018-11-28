import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menus = [
    new Menu({id: 1, url: '/', label: 'Archive'}),
    // new Menu({id: 2, url: '/kitchen', label: 'Cook'})
  ];

  constructor() { }

  ngOnInit() {
  }

}
