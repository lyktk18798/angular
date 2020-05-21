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
import {CategoryComponent} from '../category/category.component';
import {ColorComponent} from '../color/color.component';
import {GroupProductComponent} from '../group-product/group-product.component';
import {ReportComponent} from '../report/report.component';
import {SatisticComponent} from '../satistic/satistic.component';
import {GroupProductsModalComponent} from '../group-product/group-products-modal/group-products-modal.component';
import {CategoryModalComponent} from '../category/category-modal/category-modal.component';
import {ColorModalComponent} from '../color/color-modal/color-modal.component';
import {ChartsModule} from 'ng2-charts';
import {DiscountComponent} from '../discount/discount.component';
@NgModule({
  imports: [
    UserRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    ColorPickerModule,
    AlertModule,
    ChartsModule,
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
                  CategoryComponent,
                  ColorComponent,
                  GroupProductComponent,
                  ReportComponent,
                  SatisticComponent,
                  GroupProductsModalComponent,
                  CategoryModalComponent,
                  ColorModalComponent,
                  DiscountComponent,
  ],
})

export class UserModule { }
