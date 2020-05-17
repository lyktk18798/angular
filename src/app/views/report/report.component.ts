import { Component, OnInit } from '@angular/core';
import {GroupProduct} from '../../models/group_product';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../service/category.service';
import {formatDate} from '@angular/common';
import {CategoryModalComponent} from '../category/category-modal/category-modal.component';
import {Category} from '../../models/category';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
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
  headers = ['No', 'Product name', 'Customer name', 'Content', 'Date created'];
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
