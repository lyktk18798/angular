import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {AuthenticationService} from '../../service/authentication.service';

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
  }
}
