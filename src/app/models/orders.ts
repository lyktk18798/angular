import {Customer} from './customer';

export class Orders {
  id: number;
  address: string;
  description: string;
  status: number;
  customer: Customer;
  createDate: string;
  code: string;
  note: string;
}
