import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../service/alert.service';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-modal-comfirm',
  templateUrl: './modal-comfirm.component.html',
  styleUrls: ['./modal-comfirm.component.scss']
})
export class ModalComfirmComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private alertService: AlertService) { }
  @Input() id;
  @Input() content;
  @Input() service;
  @Input() obj;
  ngOnInit() {
  }

  doSomething() {
    if (this.obj) {
      this.service.save(this.obj)
      .subscribe(rs => {
        this.alertService.success('Save successfullly!', {autoClose: true});
        this.activeModal.dismiss();
      }, error1 => {
        this.alertService.error('Save error!', {autoClose: true});
        this.activeModal.dismiss();
      });
    } else {
      this.service.delete(this.id)
      .subscribe(rs => {
        this.alertService.success('Delete successfullly!', {autoClose: true});
        this.activeModal.dismiss();
      }, error1 => {
        this.alertService.error('Delete error!', {autoClose: true});
        this.activeModal.dismiss();
      });
    }

  }

}
