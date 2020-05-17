import {Product} from './product';
import {Orders} from './orders';
import {Customer} from './customer';

export class Report {
  id: number;
  product: Product;
  customer: Customer;
  content: string;
  createDate: string;
}
