import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserModalComponent} from './user-modal/user-modal.component';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {formatDate} from '@angular/common';
import {Role} from '../../models/role';
import {HelperService} from '../../service/helper.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  page = 1;
  pageSize = 3;
  lstRoles: Role[] = [{id: 0, name: 'All'}];
  lstUsers: User[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Email', 'Fullname', 'Phonenumber', 'Role', 'Date registered', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: UserService,
              private helperService: HelperService,
              protected alertService: AlertService,
              ) {}

  ngOnInit() {
    this.getRoles();
    this.searchForm = new FormGroup ({
      email: new FormControl (''),
      phonenumber: new FormControl(''),
      fullname: new FormControl(''),
      role_user: new FormControl(0),
    });
    this.search();
  }

  getRoles () {
    this.helperService.getAllRole()
    .subscribe(rs => this.lstRoles = this.lstRoles.concat(rs));
  }
  search () {
    this.apiService.search(this.searchForm)
    .subscribe(rs => this.lstUsers = rs.map(item => ({
      ...item,
      createDate: formatDate(item.createDate, 'yyyy-MM-dd', 'en')
    })));
  }

  addNew () {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.u = new User();
    modalRef.componentInstance.title = 'Add new user';
    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  edit (u: User) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.u = u;
    modalRef.componentInstance.title = 'Edit user';

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  delete (u: User) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    modalRef.componentInstance.id = u.id;
    modalRef.componentInstance.content = 'Are u sure want to delete this user?';
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }
}
