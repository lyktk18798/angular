import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<Category[]> {
    const params = new HttpParams()
    .set('name', searchForm.value.name);
    return this.http.get<Category[]>(`${baseUrl}category/getAll`, {params: params});
  }

  save (user: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}category/save`, user, httpOptions);
  }

  delete (id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}category/delete/${id}`, httpOptions);
  }
}
