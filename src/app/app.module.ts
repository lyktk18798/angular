import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TokenInterceptor} from './helpers/token.intercept';
import {AuthGuard} from './guard/auth.guard';
import {AuthenticationService} from './service/authentication.service';
import {UserModule} from './views/user/user.module';
import { UserModalComponent } from './views/user/user-modal/user-modal.component';
import { ModalComfirmComponent } from './common/modal-comfirm/modal-comfirm.component';
import { ProducerModalComponent } from './views/producer/producer-modal/producer-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter} from './helpers/adapter.custom';
import {NgbDateCustomParserFormatter} from './helpers/NgbDateCustomParserFormatter';
import { ProductModalComponent } from './views/product/product-modal/product-modal.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {OrderDetailsComponent} from './views/orders/order-details/order-details.component';
import {AlertModule} from './utils/alert/alert.module';
import {GroupProductsModalComponent} from './views/group-product/group-products-modal/group-products-modal.component';
import { CategoryModalComponent } from './views/category/category-modal/category-modal.component';
import { ColorModalComponent } from './views/color/color-modal/color-modal.component';
import { NotificationModalComponent } from './common/notification-modal/notification-modal.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    CommonModule,
    ColorPickerModule,
    AlertModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ModalComfirmComponent,
    NotificationModalComponent,
  ],
  entryComponents: [
    UserModalComponent,
    ModalComfirmComponent,
    ProducerModalComponent,
    ProductModalComponent,
    OrderDetailsComponent,
    GroupProductsModalComponent,
    CategoryModalComponent,
    ColorModalComponent,
    NotificationModalComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
