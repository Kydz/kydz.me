import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {sha256} from 'js-sha256';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiEndpoint = environment.api;

  constructor(private http: HttpClient) {
  }

  static isLogin(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem(TOKEN_KEY) !== '';
  }

  static attachAuthHeader(options: any) {
    if (!options['headers']) {
      options['headers'] = {};
    }
    if (AuthService.isLogin()) {
      options['headers']['x-auth-token'] = localStorage.getItem(TOKEN_KEY);
    }
    return options;
  }

  login(pass: string): Observable<boolean> {
    const hash = sha256.create();
    hash.update(pass);
    pass = hash.hex();
    return this.http.post(this.apiEndpoint + 'admin/login', {password: pass}).pipe(
      map((res: any) => {
        if (res['token']) {
          localStorage.setItem(TOKEN_KEY, res.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post(this.apiEndpoint + 'admin/logout', {}).pipe(
      map((res: any) => {
        if (res['token']) {
          localStorage.setItem(TOKEN_KEY, res.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
