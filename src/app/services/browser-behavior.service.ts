import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserBehaviorService {

  constructor() {
  }

  scrollTop() {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      window.scrollTo(0, 0);
    }
  }
}
