import { Component, OnInit } from '@angular/core';
import {GroupProduct} from '../../models/group_product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {Color} from '../../models/color';
import {ColorService} from '../../service/color.service';
import {ColorModalComponent} from './color-modal/color-modal.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  page = 1;
  pageSize = 3;
  lstUsers: Color[] = [];
  hexColor: string = '';
  headers = ['No', 'Code', 'Color', 'Date created', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: ColorService) { }

  ngOnInit() {
    this.search();
  }

  search () {
    this.apiService.search(this.hexColor)
    .subscribe(rs => this.lstUsers = rs.map(item => ({
      ...item,
      createDate: formatDate(item.createDate, 'yyyy-MM-dd', 'en')
    })));
  }

  addNew () {
    const modalRef = this.modalService.open(ColorModalComponent);
    modalRef.componentInstance.u = new GroupProduct();
    modalRef.componentInstance.title = 'Add new color';
    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  delete (u: Color) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    modalRef.componentInstance.id = u.id;
    modalRef.componentInstance.content = 'Are u sure want to delete this color?';
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  getColor(event) {
    this.hexColor = event;
  }

}
