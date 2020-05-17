import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../../service/category.service';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Color} from '../../../models/color';

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.scss']
})
export class ColorModalComponent implements OnInit {

  user: Color = new Color();
  @Input() u;
  @Input() title;
  hexColor: string = '';
  constructor(public activeModal: NgbActiveModal,
              private apiService: CategoryService,
              private helperService: HelperService,
              private alertService: AlertService) { }
  ngOnInit() {
  }
// convenience getter for easy access to form fields
  save() {
    this.user = this.u;
    this.user.name = this.hexColor;
    this.apiService.save(this.user)
    .subscribe(rs => {
      this.alertService.success('Add new color successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Add new color error!', {autoClose: true});
      this.activeModal.dismiss();
    });
  }

  getColor(event) {
    this.hexColor = event;
  }

}
