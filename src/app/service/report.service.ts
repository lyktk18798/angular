import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Report} from '../models/Report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) { }
  search (searchForm: FormGroup): Observable<Report[]> {
    const params = new HttpParams()
    .set('productName', searchForm.value.productName)
    .set('customerName', searchForm.value.customerName);
    return this.http.get<Report[]>(`${baseUrl}report/getAll`, {params: params});
  }
}
