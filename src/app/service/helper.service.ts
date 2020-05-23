import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {Role} from '../models/role';
import {Producer} from '../models/producer';
import {Color} from '../models/color';
import {GroupProduct} from '../models/group_product';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private http: HttpClient) { }
  getAllCategory (): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}helper/category/getAll`);
  }
  getAllRole (): Observable<Role[]> {
    return this.http.get<Role[]>(`${baseUrl}helper/role/getAll`);
  }
  getAllProducer (): Observable<Producer[]> {
    return this.http.get<Producer[]>(`${baseUrl}helper/producer/getAll`);
  }

  getAllColors (): Observable<Color[]> {
    return this.http.get<Color[]>(`${baseUrl}helper/color/getAll`);
  }
  getAllGroupProduct (): Observable<GroupProduct[]> {
    return this.http.get<GroupProduct[]>(`${baseUrl}helper/groupProduct/getAll`);
  }

  pushFileToStorage(file: File, isTypeUpload: string): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('isTypeUpload', isTypeUpload);
    const newRequest = new HttpRequest('POST', `${baseUrl}helper/savefile`, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

}
