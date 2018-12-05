import { Component, OnInit } from '@angular/core';

import { Menu } from '../../models/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit {
  public menus = [
    new Menu({id: 1, url: '/', label: 'Archive'})
  ];

  constructor() {
  }

  ngOnInit() {
    if (AuthService.isLogin()) {
      this.menus.push(new Menu({id: 2, url: '/kitchen', label: 'Cook'}));
    }
  }
}
