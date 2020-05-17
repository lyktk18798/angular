import { Component, OnInit } from '@angular/core';
import {GroupProduct} from '../../models/group_product';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {CategoryService} from '../../service/category.service';
import {CategoryModalComponent} from './category-modal/category-modal.component';
import {Category} from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  page = 1;
  pageSize = 3;
  lstUsers: GroupProduct[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Name', 'Date created', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: CategoryService) { }

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
    const modalRef = this.modalService.open(CategoryModalComponent);
    modalRef.componentInstance.u = new GroupProduct();
    modalRef.componentInstance.title = 'Add new category';
    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  edit (u: Category) {
    const modalRef = this.modalService.open(CategoryModalComponent);
    modalRef.componentInstance.u = u;
    modalRef.componentInstance.title = 'Edit category';

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  delete (u: Category) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    modalRef.componentInstance.id = u.id;
    modalRef.componentInstance.content = 'Are u sure want to delete this category?';
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

}
