import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {TOKEN_NAME} from '../constants/Constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    // not logged in so redirect to login page
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
