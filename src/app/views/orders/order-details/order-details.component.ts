import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrdersDetailsService} from '../../../service/orders-details.service';
import {OrdersDetails} from '../../../models/orders-details';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, AfterContentChecked {

  constructor(private activeModal: NgbActiveModal,
              private apiService: OrdersDetailsService) { }
  page = 1;
  pageSize = 3;
  lstRs: OrdersDetails[] = [];
  headers = ['No', 'Product name', 'Price', 'Quantity', 'Discount', 'Total'];
  totalAmount: number = 0;
  @Input() title;
  @Input() orderId;
  ngOnInit() {
    this.search();
  }

  search () {
    console.log(this.totalAmount);
    this.apiService.search(this.orderId)
    .subscribe(rs => {
       this.lstRs = rs;
    });
  }
  ngAfterContentChecked()  {
    this.lstRs.forEach(item => this.totalAmount += item.quantity * item.product.price * (1 - item.discount));
  }

}
