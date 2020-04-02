import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Customer} from '../../models/customer';
import {CustomerService} from '../../service/customer.service';
import {NgbDateCustomParserFormatter} from '../../helpers/NgbDateCustomParserFormatter';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}],
})
export class CustomerComponent implements OnInit {

  page = 1;
  pageSize = 3;
  lstRs: Customer[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Email', 'Phonenumber', 'Date registered'];
  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.searchForm = new FormGroup ({
      email: new FormControl (''),
      phonenumber: new FormControl(''),
    });
    this.search();
  }
  search () {
    this.service.search(this.searchForm)
    .subscribe(rs => this.lstRs = rs.map(item => ({
      ...item,
      dateRegistered: formatDate(item.dateRegistered, 'yyyy-MM-dd', 'en')
    })));
  }

}
