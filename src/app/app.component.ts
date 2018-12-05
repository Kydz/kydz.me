import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BrowserBehaviorService } from './services/browser-behavior.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        top: 0
      })),
      state('hide', style({
        opacity: 0,
        top: '-100%'
      })),
      transition('hide => show', [animate('1.2s ease-out')]),
      transition('show => hide', [animate('.6s ease-in')])
    ])
  ]
})

export class AppComponent implements OnInit {
  title = 'app';
  headerState = 'hide';

  private readonly isMdScreen: boolean = false;

  constructor(private router: Router) {
    if (window.innerWidth <= 768) {
      this.headerState = 'show';
      this.isMdScreen = true;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        BrowserBehaviorService.scrollTop();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkHeaderDisplay() {
    if (this.isMdScreen) {
      return;
    }
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 450) {
      this.headerState = 'show';
    } else {
      this.headerState = 'hide';
    }
  }
}
