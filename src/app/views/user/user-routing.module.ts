import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {CustomerComponent} from '../customer/customer.component';
import {ProducerComponent} from '../producer/producer.component';
import {ProductComponent} from '../product/product.component';
import {OrdersComponent} from '../orders/orders.component';
import {CategoryComponent} from '../category/category.component';
import {ReportComponent} from '../report/report.component';
import {GroupProductComponent} from '../group-product/group-product.component';
import {SatisticComponent} from '../satistic/satistic.component';
import {ColorComponent} from '../color/color.component';
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
  },
  {
    path: 'category',
    component: CategoryComponent,
    data: {
      title: 'Category'
    }
  },
  {
    path: 'report',
    component: ReportComponent,
    data: {
      title: 'Report'
    }
  },
  {
    path: 'group_products',
    component: GroupProductComponent,
    data: {
      title: 'Group_Products'
    }
  },
  {
    path: 'satistical',
    component: SatisticComponent,
    data: {
      title: 'Satistic'
    }
  },
  {
    path: 'color',
    component: ColorComponent,
    data: {
      title: 'Color'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
