/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEARCH_SUPPLIER_URL, SUPPLIER_BY_ID_URL, SUPPLIER_URL } from 'src/app/demo/constants/urls';
import { Supplier } from 'src/app/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Supplier[]> {
    const SupplierList = this.http.get<Supplier[]>(SUPPLIER_URL);
    console.log(SupplierList);
    return SupplierList;
  }
  search(searchValue): Observable<Supplier[]> {
    const SupplierList = this.http.get<Supplier[]>(`${SEARCH_SUPPLIER_URL}${searchValue}`);
    console.log(SupplierList);
    return SupplierList;
  }
  get(id: any): Observable<Supplier> {
    return this.http.get<Supplier>(`${SUPPLIER_BY_ID_URL}${id}`);
  }
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(SUPPLIER_URL, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${SUPPLIER_BY_ID_URL}${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${SUPPLIER_BY_ID_URL}${id}`);
  }
  findBySearchValue(SearchValue: any): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${SUPPLIER_URL}?SearchValue=${SearchValue}`);
  }
}
