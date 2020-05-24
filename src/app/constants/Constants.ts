export const baseUrl = `http://localhost:8080/api/`;
export const TOKEN_NAME = 'jwt_token';
export const lstSatisticType = [
  {id: 1, name: 'Satictic by group products'},
  {id: 2, name: 'Satictic by brand'},
  {id: 3, name: 'Satictic by month'},
];

export const lstDiscount = [
  {id: 1, name: 'Discount by all products'},
  {id: 2, name: 'Discount by group products'},
  {id: 3, name: 'Discount by brand'},
  {id: 4, name: 'Discount by product'},
];

export const TYPE_UPLOAD_PRODUCT = '1';
export const TYPE_UPLOAD_BRANCH = '2';
export const TYPE_UPLOAD_GROUP = '3';

export const ROLE_PERMISSION = [
  {
    name: 'admin',
    dashboard: true,
    users: true,
    customer: true,
    producer: true,
    product: true,
    orders: true,
    category: true,
    report: true,
    group_products: true,
    satistical: true,
    color: true,
    discount: true,
  },
  {
    name: 'user',
    dashboard: true,
    users: false,
    customer: true,
    producer: true,
    product: true,
    orders: true,
    category: true,
    report: true,
    group_products: true,
    satistical: false,
    color: true,
    discount: false,
  },
  {
    name: 'member',
    dashboard: true,
    users: false,
    customer: true,
    producer: true,
    product: true,
    orders: false,
    category: true,
    report: true,
    group_products: true,
    satistical: false,
    color: true,
    discount: false,
  }
];
