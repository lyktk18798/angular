import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {GroupProduct} from '../models/group_product';
@Injectable({
  providedIn: 'root'
})
export class GroupProductsService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<GroupProduct[]> {
    const params = new HttpParams()
    .set('name', searchForm.value.name);
    return this.http.get<GroupProduct[]>(`${baseUrl}group-product/getAll`, {params: params});
  }

  save (user: GroupProduct) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}group-product/save`, user, httpOptions);
  }

  delete (id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}group-product/delete/${id}`, httpOptions);
  }
}
