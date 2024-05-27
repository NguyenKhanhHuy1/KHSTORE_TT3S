/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CUSTOMER_BY_ID_URL, CUSTOMER_URL } from 'src/app/pages/constants/urls';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    const CustomersList = this.http.get<Customer[]>(CUSTOMER_URL);
    console.log(CustomersList);
    return CustomersList;
  }
  get(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${CUSTOMER_BY_ID_URL}${id}`);
  }
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(CUSTOMER_URL, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${CUSTOMER_BY_ID_URL}${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${CUSTOMER_BY_ID_URL}${id}`);
  }
  findBySearchValue(SearchValue: any): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${CUSTOMER_URL}?SearchValue=${SearchValue}`);
  }
}
