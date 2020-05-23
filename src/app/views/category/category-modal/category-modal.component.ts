import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../service/category.service';
import {TYPE_UPLOAD_BRANCH} from '../../../constants/Constants';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  user: Category = new Category();
  @Input() u;
  @Input() title;
  imgURL: any;
  progress: { percentage: number } = {percentage: 0};
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(public activeModal: NgbActiveModal,
              private apiService: CategoryService,
              private helperService: HelperService,
              private alertService: AlertService) {

  }
  saveForm: FormGroup;
  ngOnInit() {
    this.saveForm = new FormGroup ({
      name: new FormControl (this.u.name, Validators.required),
      image: new FormControl(this.u.image, Validators.required),
    });
  }
// convenience getter for easy access to form fields
  get name() { return this.saveForm.get('name'); }
  get nameValid() {return this.name.invalid && (this.name.dirty || this.name.touched) && this.name.errors ; }

  saveCategory() {
    this.user = this.u;
    this.user.name = this.saveForm.value.name;
    this.user.image = this.saveForm.value.image;
    this.apiService.save(this.user)
    .subscribe(rs => {
      this.alertService.success('Save category successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save category error!', {autoClose: true});
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
    return this.helperService.pushFileToStorage(this.currentFileUpload, TYPE_UPLOAD_BRANCH);
  }

  async uploadAndSave () {
    const uploadStatus = await this.upload().toPromise();
    if (uploadStatus.statusText === 'OK') {
      this.selectedFiles = undefined;
      this.saveCategory();
    }
  }

  save(e) {
    this.uploadAndSave();
  }

}
