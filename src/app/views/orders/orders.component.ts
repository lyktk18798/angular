import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {Orders} from '../../models/orders';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrdersService} from '../../service/orders.service';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {DELIVERING, DONE, NOT_DELIVER, UNREAL_ORDERS, WAIT_APPROVE} from '../../constants/Constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  page = 1;
  pageSize = 3;
  lstStatus = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Wait approve'},
    {id: 2, name: 'Approved but not yet delivered'},
    {id: 3, name: 'Delivering...'},
    {id: 4, name: 'Done'},
  ];
  lstRs: Orders[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Code', 'Status', 'Customer email', 'Phone number', 'Address', 'Create date', 'Action'];
  orders = new Orders();
  constructor(private modalService: NgbModal,
              private apiService: OrdersService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      code: new FormControl(''),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      status: new FormControl(0),
    });
    this.search();
  }

  search() {
    this.apiService.search(this.searchForm)
    .subscribe(rs => {
      this.lstRs = rs.map(item => ({
        ...item,
        createDate: formatDate(item.createDate, 'yyyy-MM-dd', 'en'),
      }));
    });
  }

  detail(u: Orders) {
    const modalRef = this.modalService.open(OrderDetailsComponent);
    modalRef.componentInstance.title = 'Details orders info';
    modalRef.componentInstance.orderId = u.id;
    modalRef.result.then((data) => {
    }, (reason) => {
    });
  }

  updateStatus(u: Orders, type: number) {
    this.orders = Object.assign(Object.create(Orders.prototype), u);
    const modalRef = this.modalService.open(ModalComfirmComponent);
    let msg = '';
    if (type === UNREAL_ORDERS) {
      msg = 'unreal orders';
      this.orders.status = UNREAL_ORDERS;
    } else if (type === NOT_DELIVER) {
      msg = 'approved but not delivery';
      this.orders.status = NOT_DELIVER;
    } else if (type === NOT_DELIVER) {
      msg = 'not yet delivered';
      this.orders.status = DELIVERING;
    } else if (type === DELIVERING) {
      msg = 'delivering...';
      this.orders.status = DELIVERING;
    } else if (type === DONE) {
      msg = 'done';
      this.orders.status = DONE;
    }
    console.log(this.orders.status, u.status);
    modalRef.componentInstance.obj = this.orders;
    modalRef.componentInstance.content = `Are u sure want to change order to ${msg} ?`;
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }
}
