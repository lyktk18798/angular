import {Component, OnInit} from '@angular/core';
import {navItems, navItemsRoleMember, navItemsRoleUser} from '../../_nav';
import {AuthenticationService} from '../../service/authentication.service';
import {Role} from '../../models/role';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements  OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private apiService: AuthenticationService) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout () {
    this.apiService.logout();
  }
  ngOnInit(): void {
    const roleUser = jwt_decode(this.apiService.getToken())[`user-login`].role;
    if (roleUser === 'user') {
      this.navItems = navItemsRoleUser;
    } else if (roleUser === 'member') {
      this.navItems = navItemsRoleMember;
    }
  }
}
