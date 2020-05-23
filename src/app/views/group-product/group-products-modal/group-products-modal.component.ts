import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupProduct} from '../../../models/group_product';
import {GroupProductsService} from '../../../service/group-products.service';
import {TYPE_UPLOAD_BRANCH, TYPE_UPLOAD_GROUP} from '../../../constants/Constants';
import {async} from '../../../../../node_modules/rxjs/internal/scheduler/async';

@Component({
  selector: 'app-group-products-modal',
  templateUrl: './group-products-modal.component.html',
  styleUrls: ['./group-products-modal.component.scss']
})
export class GroupProductsModalComponent implements OnInit {
  user: GroupProduct = new GroupProduct();
  @Input() u;
  @Input() title;
  imgURL: any;
  progress: { percentage: number } = {percentage: 0};
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(public activeModal: NgbActiveModal,
              private apiService: GroupProductsService,
              private helperService: HelperService,
              private alertService: AlertService) {
  }

  saveForm: FormGroup;

  ngOnInit() {
    this.saveForm = new FormGroup({
      name: new FormControl(this.u.name, Validators.required),
      image: new FormControl(this.u.image, Validators.required),
    });
  }

// convenience getter for easy access to form fields
  get name() {
    return this.saveForm.get('name');
  }

  get nameValid() {
    return this.name.invalid && (this.name.dirty || this.name.touched) && this.name.errors;
  }

  save() {
    this.uploadAndSave();
  }

  async uploadAndSave() {
    const uploadStatus = await this.upload().toPromise();
    if (uploadStatus.statusText === 'OK') {
      this.selectedFiles = undefined;
      this.saveGroup();
    }
  }

  saveGroup() {
    this.user = this.u;
    this.user.name = this.saveForm.value.name;
    this.user.image = this.saveForm.value.image;
    this.apiService.save(this.user)
    .subscribe(rs => {
      this.alertService.success('Save group product successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save group product error!', {autoClose: true});
      this.activeModal.dismiss();
    });
  }

  getURL(imgURL: any) {
    this.imgURL = imgURL;
  }

  getFiles(files: any) {
    this.saveForm.controls['image'].setValue(files[0].name);
    this.selectedFiles = files;
  }

  upload() {
    if (!this.selectedFiles) {
      return;
    }
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    return this.helperService.pushFileToStorage(this.currentFileUpload, TYPE_UPLOAD_GROUP);
  }

}
