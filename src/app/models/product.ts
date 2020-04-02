import {Category} from './category';
import {Producer} from './producer';
import {Color} from './color';
import {GroupProduct} from './group_product';

export class Product {
  id: number;
  name: string;
  code: string;
  price: number;
  size: number;
  quantity: number;
  dateImport: string;
  desciption: string;
  image: string;
  category: Category;
  producer: Producer;
  color: Color;
  productGroup: GroupProduct;
}
