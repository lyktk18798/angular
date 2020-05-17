import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {Color} from '../models/color';
@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private http: HttpClient) { }
  search (color: string): Observable<Color[]> {
    const params = new HttpParams()
    .set('name', color);
    return this.http.get<Category[]>(`${baseUrl}color/getAll`, {params: params});
  }

  save (user: Color) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}color/save`, user, httpOptions);
  }

  delete (id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(`${baseUrl}color/delete/${id}`, httpOptions);
  }
}
