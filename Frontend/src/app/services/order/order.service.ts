/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_URL, ORDER_BY_ID_URL } from 'src/app/demo/constants/urls';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    const OrdersList = this.http.get<Order[]>(ORDER_URL);
    console.log(OrdersList);
    return OrdersList;
  }
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(ORDER_URL, data);
  }
  get(id: any): Observable<Order> {
    return this.http.get<Order>(`${ORDER_BY_ID_URL}${id}`);
  }
  update(id: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put(`${ORDER_BY_ID_URL}${id}`, data);
  }
}
