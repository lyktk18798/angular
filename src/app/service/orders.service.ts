import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {Orders} from '../models/orders';
import {Producer} from '../models/producer';
@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<Orders[]> {
    const params = new HttpParams()
    .set('code', searchForm.value.code)
    .set('dateFrom', searchForm.value.dateFrom)
    .set('dateTo', searchForm.value.dateTo)
    .set('status', searchForm.value.status);
    return this.http.get<Orders[]>(`${baseUrl}order/getAll`, {params: params});
  }

  save (u: Orders) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}order/update`, u, httpOptions);
  }
}
