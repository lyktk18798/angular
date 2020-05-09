import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Producer} from '../../../models/producer';
import {ProducerService} from '../../../service/producer.service';
import {Category} from '../../../models/category';
import {HelperService} from '../../../service/helper.service';
import {AlertService} from '../../../service/alert.service';

@Component({
  selector: 'app-producer-modal',
  templateUrl: './producer-modal.component.html',
  styleUrls: ['./producer-modal.component.scss']
})
export class ProducerModalComponent implements OnInit {

  producer: Producer = new Producer();
  lstCategory: Category[] = [];
  @Input() u;
  @Input() title;
  constructor(public activeModal: NgbActiveModal,
              private apiService: ProducerService,
              private helperService: HelperService,
              private alertService: AlertService ) { }
  saveForm: FormGroup;
  ngOnInit() {
    this.getCategory();
    this.saveForm = new FormGroup ({
      email: new FormControl (this.u.email, [Validators.required, Validators.email]),
      fullname: new FormControl (this.u.name, Validators.required),
      phonenumber: new FormControl(this.u.phone, [Validators.required, Validators.pattern('[0-9]{10}')]),
      category: new FormControl(this.u.id ? this.u.category.id : 1),
    });
  }

  getCategory () {
    this.helperService.getAllCategory()
    .subscribe(rs => this.lstCategory = rs);
  }
// convenience getter for easy access to form fields
  get email() { return this.saveForm.get('email'); }
  get fullname() { return this.saveForm.get('fullname'); }
  get phonenumber() { return this.saveForm.get('phonenumber'); }
  get emailValid() {return this.email.invalid && (this.email.dirty || this.email.touched) && this.email.errors ; }
  get fullnameValid() {return this.fullname.invalid && (this.fullname.dirty || this.fullname.touched) && this.fullname.errors ; }
  get phoneValid() {return this.phonenumber.invalid && (this.phonenumber.dirty || this.phonenumber.touched) && this.phonenumber.errors ; }
  save() {
    this.producer = this.u;
    this.producer.email = this.saveForm.value.email;
    this.producer.name = this.saveForm.value.fullname;
    this.producer.phone = this.saveForm.value.phonenumber;
    this.producer.category = new Category();
    this.producer.category.id = this.saveForm.value.category;

    this.apiService.save(this.producer)
    .subscribe(rs => {
      this.alertService.success('Save producer successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save producer error!', {autoClose: true});
      this.activeModal.dismiss();
    });

    this.saveForm.reset();
  }
}
