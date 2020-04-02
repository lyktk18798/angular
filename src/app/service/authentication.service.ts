import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Request} from '../models/request';
import {ActivatedRoute, Router} from '@angular/router';
import {baseUrl, TOKEN_NAME} from '../constants/Constants';
import * as jwt_decode from 'jwt-decode';
import {AlertService} from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  returnUrl: string = this.route.snapshot.queryParams['returnUrl'] || '/';
  error = '';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,) {
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user: Request) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(`${baseUrl}user/authenticated`, user, httpOptions)
    .subscribe(token => {
      if (token && token.jwt) {
        this.alertService.success('Login successfullly!', {autoClose: true});
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.setToken(JSON.stringify(token.jwt));
        this.router.navigate([this.returnUrl]);
      }
      return token;
    }, error1 => {
      this.alertService.error('Login error!', {autoClose: true});
    });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/login']);
  }
}
