import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {User} from '../../../models/user';
import {Role} from '../../../models/role';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';
import {oneValueHasToBeChangedValidator} from '../../../helpers/validator.custom';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  lstRoles: Role[] = [];
  user: User = new User();
  @Input() u;
  @Input() title;
  constructor(public activeModal: NgbActiveModal,
              private apiService: UserService,
              private helperService: HelperService,
              private alertService: AlertService,
              private formBuilder: FormBuilder) { }
  saveForm: FormGroup;
  ngOnInit() {
    this.getRoles();
    this.saveForm = this.formBuilder.group({
      email: new FormControl (this.u.email, [Validators.required, Validators.email]),
      fullname: new FormControl (this.u.fullname, Validators.required),
      phonenumber: new FormControl(this.u.phonenumber, [Validators.required, Validators.pattern('[0-9]{10}')]),
      role_user: new FormControl(this.u.id ?  this.u.role.id : '0'),
    }, {
      validator : oneValueHasToBeChangedValidator([
        {
          controlName: 'role_user',
          initialValue: '0'
        }
      ])
    });
  }

  getRoles () {
    this.helperService.getAllRole()
    .subscribe(rs => this.lstRoles = rs);
  }
// convenience getter for easy access to form fields
  get email() { return this.saveForm.get('email'); }
  get fullname() { return this.saveForm.get('fullname'); }
  get phonenumber() { return this.saveForm.get('phonenumber'); }
  get role() { return this.saveForm.get('role_user'); }
  get emailValid() {return this.email.invalid && (this.email.dirty || this.email.touched) && this.email.errors ; }
  get fullnameValid() {return this.fullname.invalid && (this.fullname.dirty || this.fullname.touched) && this.fullname.errors ; }
  get phoneValid() {return this.phonenumber.invalid && (this.phonenumber.dirty || this.phonenumber.touched) && this.phonenumber.errors ; }
  save() {
    // stop here if form is invalid
    if (this.saveForm.invalid) {
      return;
    }
    this.user = this.u;
    this.user.email = this.saveForm.value.email;
    this.user.fullname = this.saveForm.value.fullname;
    this.user.phonenumber = this.saveForm.value.phonenumber;
    this.user.role = new Role();
    this.user.role.id = this.saveForm.value.role_user;
    this.apiService.save(this.user)
    .subscribe(rs => {
      this.alertService.success('Save user successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save user error!', {autoClose: true});
      this.activeModal.dismiss();
    });
  }
}
