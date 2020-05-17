import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {Producer} from '../../models/producer';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbCalendar, NgbDateAdapter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../service/helper.service';
import {formatDate} from '@angular/common';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {ProductService} from '../../service/product.service';
import {Product} from '../../models/product';
import {ProductModalComponent} from './product-modal/product-modal.component';
import {Color} from '../../models/color';
import {GroupProduct} from '../../models/group_product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  page = 1;
  pageSize = 3;
  lstCategory: Category[] = [{id: 0, name: 'All', createDate: ''}];
  lstColor: Color[] = [{id: 0, name: 'All'}];
  lstGroups: GroupProduct[] = [{id: 0, name: 'All'}];
  lstProducer: Producer[] = [{id: 0, name: 'All', email: '', category: new Category(), phone: '', dateCreate: ''}];
  lstRs: Product[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Code', 'Name', 'Price', 'Group', 'Category', 'Quantity', 'Color', 'Size', 'Description', 'Image', 'Producer', 'Date import', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: ProductService,
              private helperService: HelperService) {}

  ngOnInit() {
    this.getCategory();
    this.getProducer();
    this.getColor();
    this.getGroups();
    this.searchForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      priceFrom: new FormControl(''),
      priceTo: new FormControl(''),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      color: new FormControl(0),
      size: new FormControl(''),
      category: new FormControl(0),
      producer: new FormControl(0),
      groupId: new FormControl(0),
    });
    this.search();
  }
  getCategory () {
    this.helperService.getAllCategory()
    .subscribe(rs => this.lstCategory = this.lstCategory.concat(rs));
  }
  getProducer () {
    this.helperService.getAllProducer()
    .subscribe(rs => this.lstProducer = this.lstProducer.concat(rs));
  }
  getColor () {
    this.helperService.getAllColors()
    .subscribe(rs => this.lstColor = this.lstColor.concat(rs));
  }
  getGroups () {
    this.helperService.getAllGroupProduct()
    .subscribe(rs => this.lstGroups = this.lstGroups.concat(rs));
  }
  search () {
    this.apiService.search(this.searchForm)
    .subscribe(rs => {
      this.lstRs = rs.map(item => ({
      ...item,
      dateImport: formatDate(item.dateImport, 'yyyy-MM-dd', 'en')
    }));
    });
  }
  addNew () {
    const modalRef = this.modalService.open(ProductModalComponent, {size: 'lg'});
    modalRef.componentInstance.u = new Product();
    modalRef.componentInstance.title = 'Add new product';
    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }
  edit (u: Producer) {
    const modalRef = this.modalService.open(ProductModalComponent, {size: 'lg'});
    modalRef.componentInstance.u = u;
    modalRef.componentInstance.title = 'Edit product';

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  delete (u: Producer) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    modalRef.componentInstance.id = u.id;
    modalRef.componentInstance.content = 'Are u sure want to delete this product?';
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }
  onSelect (item) {
    this.searchForm.value.color = item.id;
    this.search();
  }
  // downloadFile (name) {
  //   const link = document.createElement('a');
  //   link.setAttribute('target', '_blank');
  //   link.setAttribute('href', `${ROOT_PATH_FILE}`);
  //   link.setAttribute('download', name);
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }
}
