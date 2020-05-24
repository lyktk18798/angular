import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {lstDiscount} from '../../constants/Constants';
import {GroupProduct} from '../../models/group_product';
import {HelperService} from '../../service/helper.service';
import {Category} from '../../models/category';
import {Discount} from '../../models/discount';
import {error} from 'selenium-webdriver';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  searchForm: FormGroup;
  lstDiscount = lstDiscount;
  lstGroups: GroupProduct[] = [];
  lstCategory: Category[] = [];
  discount: Discount = new Discount();
  constructor(private helperService: HelperService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      type: new FormControl(1),
      percent: new FormControl(''),
      groupId: new FormControl('0'),
      category: new FormControl('0'),
      code: new FormControl(''),
    });
    this.getGroups();
    this.getCategory();
  }

  getGroups() {
    this.helperService.getAllGroupProduct()
    .subscribe(rs => this.lstGroups = rs);
  }

  getCategory() {
    this.helperService.getAllCategory()
    .subscribe(rs => this.lstCategory = rs);
  }

  apply() {
    this.discount.categoryId = this.searchForm.value.category;
    this.discount.code = this.searchForm.value.code;
    this.discount.groupId = this.searchForm.value.groupId;
    this.discount.discount = this.searchForm.value.percent;
    this.helperService.discount(this.discount)
    .toPromise().then(rs => {
      this.alertService.success('Apply discount success!', {autoClose: true});
      this.searchForm.reset();
    }, error => {
      this.alertService.error('Apply discount error!', {autoClose: true});
    });
  }

}
