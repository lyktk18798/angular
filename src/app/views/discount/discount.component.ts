import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {lstDiscount} from '../../constants/Constants';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  searchForm: FormGroup;
  lstDiscount = lstDiscount;
  constructor() { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      type: new FormControl(1),
      percent: new FormControl(''),
    });
  }

}
