import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pass = '';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.pass).subscribe(re => {
      if (re) {
        alert('logged');
      } else {
        alert('failed to login');
      }
    }, err => {
      console.error(err);
    });
  }
}
