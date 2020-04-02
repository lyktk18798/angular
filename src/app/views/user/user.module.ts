import { NgModule } from '@angular/core';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserModalComponent} from './user-modal/user-modal.component';
import {CustomerComponent} from '../customer/customer.component';
import {ProducerComponent} from '../producer/producer.component';
import {ProducerModalComponent} from '../producer/producer-modal/producer-modal.component';
import {ProductComponent} from '../product/product.component';
import {ProductModalComponent} from '../product/product-modal/product-modal.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {OrdersComponent} from '../orders/orders.component';
import {OrderDetailsComponent} from '../orders/order-details/order-details.component';
import {UploadComponent} from '../../utils/upload/upload.component';
import {AlertModule} from '../../utils/alert/alert.module';
@NgModule({
  imports: [
    UserRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    ColorPickerModule,
    AlertModule,
  ],

  declarations: [ UserComponent,
                  UserModalComponent,
                  CustomerComponent,
                  ProducerComponent,
                  ProducerModalComponent,
                  ProductComponent,
                  ProductModalComponent,
                  OrdersComponent,
                  OrderDetailsComponent,
                  UploadComponent,
  ],
})

export class UserModule { }
