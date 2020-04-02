import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../constants/Constants';
import {Observable} from 'rxjs';
import {OrdersDetails} from '../models/orders-details';
@Injectable({
  providedIn: 'root'
})

export class OrdersDetailsService {
  constructor(private http: HttpClient) { }
  search (id: number): Observable<OrdersDetails[]> {
    return this.http.get<OrdersDetails[]>(`${baseUrl}orderDetails/getDetails/${id}`);
  }
}
