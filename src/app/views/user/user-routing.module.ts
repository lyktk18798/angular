import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {CustomerComponent} from '../customer/customer.component';
import {ProducerComponent} from '../producer/producer.component';
import {ProductComponent} from '../product/product.component';
import {OrdersComponent} from '../orders/orders.component';
const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'customer',
    component: CustomerComponent,
    data: {
      title: 'Customer'
    }
  },
  {
    path: 'producer',
    component: ProducerComponent,
    data: {
      title: 'Producer'
    }
  },
  {
    path: 'product',
    component: ProductComponent,
    data: {
      title: 'Product'
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: {
      title: 'Orders'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
