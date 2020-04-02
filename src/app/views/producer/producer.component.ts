import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {ModalComfirmComponent} from '../../common/modal-comfirm/modal-comfirm.component';
import {ProducerService} from '../../service/producer.service';
import {HelperService} from '../../service/helper.service';
import {Category} from '../../models/category';
import {Producer} from '../../models/producer';
import {ProducerModalComponent} from './producer-modal/producer-modal.component';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit {
  page = 1;
  pageSize = 3;
  lstCategory: Category[] = [{id: 0, name: 'All'}];
  lstRs: Producer[] = [];
  searchForm: FormGroup;
  headers = ['No', 'Email', 'Name', 'Phonenumber', 'Category', 'Date registered', 'Action'];
  constructor(private modalService: NgbModal,
              private apiService: ProducerService,
              private helperService: HelperService) {}

  ngOnInit() {
    this.getCategory();
    this.searchForm = new FormGroup ({
      email: new FormControl (''),
      phonenumber: new FormControl(''),
      fullname: new FormControl(''),
      category: new FormControl(0),
    });
    this.search();
  }

  getCategory () {
    this.helperService.getAllCategory()
    .subscribe(rs => this.lstCategory = this.lstCategory.concat(rs));
  }
  search () {
    this.apiService.search(this.searchForm)
    .subscribe(rs => this.lstRs = rs.map(item => ({
      ...item,
      createDate: formatDate(item.createDate, 'yyyy-MM-dd', 'en')
    })));
  }

  addNew () {
    const modalRef = this.modalService.open(ProducerModalComponent);
    modalRef.componentInstance.u = new  Producer();
    modalRef.componentInstance.title = 'Add new producer';
    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  edit (u: Producer) {
    const modalRef = this.modalService.open(ProducerModalComponent);
    modalRef.componentInstance.u = u;
    modalRef.componentInstance.title = 'Edit producer';

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }

  delete (u: Producer) {
    const modalRef = this.modalService.open(ModalComfirmComponent);
    modalRef.componentInstance.id = u.id;
    modalRef.componentInstance.content = 'Are u sure want to delete this producer?';
    modalRef.componentInstance.service = this.apiService;

    modalRef.result.then((data) => {
      this.search();
    }, (reason) => {
      this.search();
    });
  }
}
