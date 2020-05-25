import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  submitted: boolean = false;
  constructor(private helperService: HelperService,
              private alertService: AlertService) { }
  ngOnInit() {
    this.searchForm = new FormGroup({
      type: new FormControl(1),
      percent: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,3}')]),
      groupId: new FormControl('0'),
      category: new FormControl('0'),
      code: new FormControl('', Validators.required),
    });
    this.getGroups();
    this.getCategory();
  }

  get percent() { return this.searchForm.get('percent'); }
  get percentValid() {return this.submitted && this.percent.invalid && this.percent.errors ; }
  get code() { return this.searchForm.get('code'); }
  get codeValid() {return this.submitted && this.code.invalid && this.code.errors ; }

  getGroups() {
    this.helperService.getAllGroupProduct()
    .subscribe(rs => this.lstGroups = rs);
  }

  getCategory() {
    this.helperService.getAllCategory()
    .subscribe(rs => this.lstCategory = rs);
  }

  apply() {
    this.submitted = true;
    if(this.searchForm.value.type === 1 && this.percentValid){
      return;
    }
    if(this.searchForm.value.type === 2 && this.searchForm.value.groupId === '0') {
      return;
    }
    if(this.searchForm.value.type === 3 && this.searchForm.value.category === '0') {
      return;
    }
    if(this.searchForm.value.type === 4 && this.codeValid) {
      return;
    }

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
