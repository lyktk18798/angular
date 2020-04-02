import {Product} from './product';
import {Orders} from './orders';

export class OrdersDetails {
  id: number;
  quantity: number;
  product: Product;
  discount: number;
  orders: Orders;
}
