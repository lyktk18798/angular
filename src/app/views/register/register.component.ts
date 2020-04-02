import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {Role} from '../../models/role';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  saveForm: FormGroup;
  user: User = new User();
  constructor(private apiService: UserService,
              private router: Router,
              private alertService: AlertService) { }
  ngOnInit(): void {
    this.saveForm = new FormGroup ({
      email: new FormControl ('', [Validators.required, Validators.email]),
      // fullname: new FormControl ('', Validators.required),
      // phonenumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    });
  }

  get email() { return this.saveForm.get('email'); }
  // get fullname() { return this.saveForm.get('fullname'); }
  // get phonenumber() { return this.saveForm.get('phonenumber'); }
  get emailValid() {return this.email.invalid && (this.email.dirty || this.email.touched) && this.email.errors ; }
  // get fullnameValid() {return this.fullname.invalid && (this.fullname.dirty || this.email.touched) && this.fullname.errors ; }
  // get phoneValid() {return this.phonenumber.invalid && (this.phonenumber.dirty || this.phonenumber.touched) && this.phonenumber.errors ; }

  createAcc () {
// stop here if form is invalid
    if (this.saveForm.invalid) {
      return;
    }
    this.user.email = this.saveForm.value.email;
    this.user.fullname = this.saveForm.value.fullname;
    this.user.phonenumber = this.saveForm.value.phonenumber;
    this.user.role = new Role();
    this.user.role.id = 3;
    this.apiService.save(this.user)
    .subscribe(rs => {
      console.log('done');
      this.router.navigate(['/login']);
    });
  }
  forgotPass () {
    if (this.saveForm.invalid) {
      return;
    }
    this.apiService.forgotPass(this.saveForm.value.email)
    .subscribe(rs => {
      this.alertService.success('You need login into your email to take new password!', {autoClose: true});
      console.log('done')
      this.router.navigate(['/login']);
    }, error1 => {
      console.log(error1);
      this.alertService.error('Your email is not exist in our system! Must try another email', {autoClose: true});
    });
  }

}
