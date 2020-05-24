import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {ROLE_PERMISSION, TOKEN_NAME} from '../constants/Constants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationModalComponent} from '../common/notification-modal/notification-modal.component';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthenticationService,
              private modalService: NgbModal,
              ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    // not logged in so redirect to login page
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isTokenExpired()) {
      // Get current route
      const currentRoute = state.url.split('/')[2];
      if (!this.checkPermission(currentRoute)) {
        const modalRef = this.modalService.open(NotificationModalComponent);
        modalRef.componentInstance.content = `You don't have any permission to access`;

        modalRef.result.then((data) => {
          this.router.navigate(['/dashboard']);
        }, (reason) => {
        });
        return false;
      }
      return true;
    }
    // not logged in so redirect to login page
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  checkPermission(currentRoute: string) {
    const user_role = this.authService.getUserLoginInfo();
    const permissionByRole = ROLE_PERMISSION.find(role => role.name === user_role);
    return permissionByRole[currentRoute];
  }
}
