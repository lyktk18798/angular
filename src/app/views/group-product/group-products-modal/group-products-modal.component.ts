import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupProduct} from '../../../models/group_product';
import {GroupProductsService} from '../../../service/group-products.service';

@Component({
  selector: 'app-group-products-modal',
  templateUrl: './group-products-modal.component.html',
  styleUrls: ['./group-products-modal.component.scss']
})
export class GroupProductsModalComponent implements OnInit {
  user: GroupProduct = new GroupProduct();
  @Input() u;
  @Input() title;
  constructor(public activeModal: NgbActiveModal,
              private apiService: GroupProductsService,
              private helperService: HelperService,
              private alertService: AlertService) { }
  saveForm: FormGroup;
  ngOnInit() {
    this.saveForm = new FormGroup ({
      name: new FormControl (this.u.name, Validators.required),
    });
  }
// convenience getter for easy access to form fields
  get name() { return this.saveForm.get('name'); }
  get nameValid() {return this.name.invalid && (this.name.dirty || this.name.touched) && this.name.errors ; }
  save() {
    // stop here if form is invalid
    if (this.saveForm.invalid) {
      return;
    }
    this.user = this.u;
    this.user.name = this.saveForm.value.name;
    this.apiService.save(this.user)
    .subscribe(rs => {
      this.alertService.success('Save group product successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save group product error!', {autoClose: true});
      this.activeModal.dismiss();
    });
  }

}
