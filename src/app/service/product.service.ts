import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<Product[]> {
    const params = new HttpParams()
    .set('name', searchForm.value.name)
    .set('code', searchForm.value.code)
    .set('colorId', searchForm.value.color)
    .set('priceFrom', searchForm.value.priceFrom)
    .set('priceTo', searchForm.value.priceTo)
    .set('dateFrom', searchForm.value.dateFrom)
    .set('dateTo', searchForm.value.dateTo)
    .set('size', searchForm.value.size)
    .set('categoryId', searchForm.value.category)
    .set('producerId', searchForm.value.producer)
    .set('groupId', searchForm.value.groupId);
    return this.http.get<Product[]>(`${baseUrl}product/getAll`, {params: params});
  }
  save (user: Product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}product/save`, user, httpOptions);
  }
  delete (id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}product/delete/${id}`, httpOptions);
  }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', `${baseUrl}helper/savefile`, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
