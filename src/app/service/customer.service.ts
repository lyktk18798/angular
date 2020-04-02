import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<Customer[]> {
    const params = new HttpParams()
    .set('email', searchForm.value.email)
    .set('phonenumber', searchForm.value.phonenumber);
    return this.http.get<Customer[]>(`${baseUrl}customer/getAll`, {params: params});
  }
}
