import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Producer} from '../models/producer';
@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<Producer[]> {
    const params = new HttpParams()
    .set('email', searchForm.value.email)
    .set('fullname', searchForm.value.fullname)
    .set('phonenumber', searchForm.value.phonenumber)
    .set('categoryId', searchForm.value.category);
    return this.http.get<Producer[]>(`${baseUrl}producer/getAll`, {params: params});
  }

  save (user: Producer) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}producer/save`, user, httpOptions);
  }

  delete (id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}producer/delete/${id}`, httpOptions);
  }
}
