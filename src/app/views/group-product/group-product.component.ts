import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {FormControl, FormGroup} from '@angular/forms';
import {GroupProduct} from '../../models/group_product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../service/user.service';
import {HelperService} from '../../service/helper.service';
import {AlertService} from '../../service/alert.service';
import {formatDate} from '@angular/common';
import {UserModalComponent} from '../user/user-modal/user-modal.component';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {GroupProductsService} from '../../service/group-products.service';
import {GroupProductsModalComponent} from './group-products-modal/group-products-modal.component';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.scss']
})

export class GroupProductComponent implements OnInit {
  page = 1;
  pageSize = 3;
  lstUsers: GroupProduct[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Name', 'Image', 'Date created', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: GroupProductsService) { }

  ngOnInit() {
    this.searchForm = new FormGroup ({
      name: new FormControl (''),
    });
    this.search();
  }

  search () {
    this.apiService.search(this.searchForm)
    .subscribe(rs => this.lstUsers = rs.map(item => ({
      ...item,
      createDate: formatDate(item.createDate, 'yyyy-MM-dd', 'en')
    })));
  }

  addNew () {
    const modalRef = this.modalService.open(GroupProductsModalComponent);
    modalRef.componentInstance.u = new GroupProduct();
    modalRef.componentInstance.title = 'Add new group products';
    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  edit (u: GroupProduct) {
    const modalRef = this.modalService.open(GroupProductsModalComponent);
    modalRef.componentInstance.u = u;
    modalRef.componentInstance.title = 'Edit group products';

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  delete (u: GroupProduct) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    modalRef.componentInstance.id = u.id;
    modalRef.componentInstance.content = 'Are u sure want to delete this group products?';
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

}
