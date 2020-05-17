import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  user: Category = new Category();
  @Input() u;
  @Input() title;
  constructor(public activeModal: NgbActiveModal,
              private apiService: CategoryService,
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
      this.alertService.success('Save category successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save category error!', {autoClose: true});
      this.activeModal.dismiss();
    });
  }

}
