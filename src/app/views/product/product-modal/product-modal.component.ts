import {Component, Input, OnInit} from '@angular/core';
import {Producer} from '../../../models/producer';
import {Category} from '../../../models/category';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../service/helper.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../service/product.service';
import {Product} from '../../../models/product';
import {Color} from '../../../models/color';
import {GroupProduct} from '../../../models/group_product';
import {AlertService} from '../../../service/alert.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['../product.component.scss']
})
export class ProductModalComponent implements OnInit {
  product: Product = new Product();
  lstCategory: Category[] = [];
  lstProducer: Producer[] = [];
  lstColor: Color[] = [];
  lstGroups: GroupProduct[] = [];
  progress: { percentage: number } = {percentage: 0};
  selectedFiles: FileList;
  currentFileUpload: File;
  imgURL: any;
  @Input() u;
  @Input() title;

  constructor(public activeModal: NgbActiveModal,
              private apiService: ProductService,
              private helperService: HelperService,
              private alertService: AlertService) {
  }

  saveForm: FormGroup;

  ngOnInit() {
    this.getCategory();
    this.getProducer();
    this.getColor();
    this.getGroups();
    this.imgURL = this.u.id ? `assets/img/products/${this.u.image}` : '';
    this.saveForm = new FormGroup({
      name: new FormControl(this.u.name, Validators.required),
      image: new FormControl(this.u.image, Validators.required),
      color: new FormControl(this.u.id ? this.u.color.id : 0),
      desc: new FormControl(this.u.desciption),
      quantity: new FormControl(this.u.quantity, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      size: new FormControl(this.u.size, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      price: new FormControl(this.u.price, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      category: new FormControl(this.u.id ? this.u.category.id : 0),
      producer: new FormControl(this.u.id ? this.u.producer.id : 0),
      groupId: new FormControl(this.u.id ? this.u.productGroup.id : 0),
    });
  }

  getCategory() {
    this.helperService.getAllCategory()
    .subscribe(rs => this.lstCategory = rs);
  }

  getProducer() {
    this.helperService.getAllProducer()
    .subscribe(rs => this.lstProducer = rs);
  }

// convenience getter for easy access to form fields
  get name() {
    return this.saveForm.get('name');
  }

  get image() {
    return this.saveForm.get('image');
  }

  get color() {
    return this.saveForm.get('color');
  }

  get quantity() {
    return this.saveForm.get('quantity');
  }

  get size() {
    return this.saveForm.get('size');
  }

  get price() {
    return this.saveForm.get('price');
  }

  get nameValid() {
    return this.name.invalid && (this.name.dirty || this.name.touched) && this.name.errors;
  }

  get quantityValid() {
    return this.quantity.invalid && (this.quantity.dirty || this.quantity.touched) && this.quantity.errors;
  }

  get sizeValid() {
    return this.size.invalid && (this.size.dirty || this.size.touched) && this.size.errors;
  }

  get priceValid() {
    return this.price.invalid && (this.price.dirty || this.price.touched) && this.price.errors;
  }

  get colorValid() {
    return this.color.invalid && (this.color.dirty || this.color.touched) && this.color.errors;
  }

  upload() {
    if (!this.selectedFiles) {
      return;
    }
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.apiService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        // if (event.type === HttpEventType.UploadProgress) {
        //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
        // } else if (event instanceof HttpResponse) {
        //   alert('File Successfully Uploaded');
        // }
        this.selectedFiles = undefined;
      }
    );
  }

  saveProduct() {
    this.product = this.u;
    this.product.desciption = this.saveForm.value.desc;
    this.product.name = this.saveForm.value.name;
    this.product.size = this.saveForm.value.size;
    this.product.quantity = this.saveForm.value.quantity;
    this.product.image = this.saveForm.value.image;
    this.product.price = this.saveForm.value.price;
    this.product.category = new Category();
    this.product.producer = new Producer();
    this.product.color = new Color();
    this.product.productGroup = new GroupProduct();
    this.product.category.id = this.saveForm.value.category;
    this.product.producer.id = this.saveForm.value.producer;
    this.product.color.id = this.saveForm.value.color;
    this.product.productGroup.id = this.saveForm.value.groupId;
    this.apiService.save(this.product)
    .subscribe(rs => {
      this.alertService.success('Save product successfullly!', {autoClose: true});
      this.activeModal.dismiss();
    }, error1 => {
      this.alertService.error('Save product error!', {autoClose: true});
      this.activeModal.dismiss();
    });
  }

  save() {
    this.upload();
    this.saveProduct();
  }

  getColor() {
    this.helperService.getAllColors()
    .subscribe(rs => this.lstColor = this.lstColor.concat(rs));
  }

  getURL(imgURL: any) {
    this.imgURL = imgURL;
  }

  getFiles(files: any) {
    this.saveForm.value.image = files[0].name;
    this.selectedFiles = files;
  }

  getGroups() {
    this.helperService.getAllGroupProduct()
    .subscribe(rs => this.lstGroups = this.lstGroups.concat(rs));
  }
}

