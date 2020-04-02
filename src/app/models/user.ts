import {Role} from './role';

export class User {
  id: number;
  email: string;
  fullname: string;
  phonenumber: string;
  createDate: string;
  createBy: number;
  password: string;
  role: Role;
}
