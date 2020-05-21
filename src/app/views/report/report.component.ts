import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {Report} from '../../models/Report';
import {ReportService} from '../../service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  page = 1;
  pageSize = 3;
  lstUsers: Report[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Product name', 'Code', 'Customer name', 'Content', 'Date created'];
  constructor(private modalService: NgbModal,
              private apiService: ReportService) { }

  ngOnInit() {
    this.searchForm = new FormGroup ({
      productName: new FormControl (''),
      customerName: new FormControl (''),
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
}
