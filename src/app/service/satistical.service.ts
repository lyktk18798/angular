import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {FormGroup} from '@angular/forms';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {SatisticByGroup} from '../models/satistic-by-group';
import {SatisticByBrand} from '../models/satistic-by-brand';
import {SatisticByMonth} from '../models/satistic-by-month';
@Injectable({
  providedIn: 'root'
})
export class SatisticalService {
  constructor(private http: HttpClient) { }
  satisticByGroup (): Observable<SatisticByGroup[]> {
    return this.http.get<SatisticByGroup[]>(`${baseUrl}satistical/byGroup`);
  }

  satisticByBrand (): Observable<SatisticByBrand[]> {
    return this.http.get<SatisticByBrand[]>(`${baseUrl}satistical/byBrand`);
  }

  satisticByMonth (): Observable<SatisticByMonth[]> {
    return this.http.get<SatisticByMonth[]>(`${baseUrl}satistical/byMonth`);
  }
}
