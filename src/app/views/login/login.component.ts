import { Component } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Request} from '../../models/request';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loading = false;
  returnUrl: string;
  error = '';
  request: Request = new Request();
  loginForm = new FormGroup ({
    username: new FormControl (''),
    password: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService,
    private modalService: NgbModal
  ) {}
  OnInit () {
    // reset login status
    this.service.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.request.username = this.loginForm.value.username;
    this.request.password = this.loginForm.value.password;
    this.service.login(this.request);
  }

  forgotPass () {
    this.router.navigate(['/register']);
  }

  register () {

  }
}
