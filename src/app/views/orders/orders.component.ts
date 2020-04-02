import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {Orders} from '../../models/orders';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrdersService} from '../../service/orders.service';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  page = 1;
  pageSize = 3;
  lstStatus: Category[] = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Not yet delivered'},
    {id: 2, name: 'Delivering...'},
    {id: 3, name: 'Done'},
    ];
  lstRs: Orders[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Code', 'Status', 'Customer email', 'Customer phone', 'Address', 'Create date', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: OrdersService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      code: new FormControl(''),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      status: new FormControl(0),
    });
    this.search();
  }
  search () {
    this.apiService.search(this.searchForm)
    .subscribe(rs => {
      this.lstRs = rs.map(item => ({
        ...item,
        createDate: formatDate(item.createDate, 'yyyy-MM-dd', 'en'),
      }));
    });
  }

  detail (u: Orders) {
    const modalRef = this.modalService.open(OrderDetailsComponent);
    modalRef.componentInstance.title = 'Details orders info';
    modalRef.componentInstance.orderId = u.id;
    modalRef.result.then((data) => {
      // this.search();
    }, (reason) => {
      // this.search();
    });
  }

  updateStatus (u: Orders) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    const msg = u.status === 1 ? 'Delivering...' : 'Done';
    modalRef.componentInstance.obj = u;
    modalRef.componentInstance.content = `Are u sure want to change order to ${msg} ?`;
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }
}
