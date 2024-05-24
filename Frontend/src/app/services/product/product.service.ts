/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEARCH_PRODUCT_URL, PRODUCT_URL, PRODUCT_BY_ID_URL } from 'src/app/demo/constants/urls';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    const ProductsList = this.http.get<Product[]>(PRODUCT_URL);
    console.log(ProductsList);
    return ProductsList;
  }
  search(searchValue: string, categoryId: string, supplierId: string): Observable<Product[]> {
    let url = `${SEARCH_PRODUCT_URL}?`;
    if (searchValue) {
      url += `searchValue=${searchValue}&`;
    }
    if (categoryId) {
      url += `categoryId=${categoryId}&`;
    }
    if (supplierId) {
      url += `supplierId=${supplierId}&`;
    }
    url = url.slice(0, -1); // Loại bỏ ký tự & cuối cùng nếu có
    return this.http.get<Product[]>(url);
  }
  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${PRODUCT_BY_ID_URL}${id}`);
  }
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(PRODUCT_URL, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${PRODUCT_BY_ID_URL}${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${PRODUCT_BY_ID_URL}${id}`);
  }
  findBySearchValue(SearchValue: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCT_URL}?SearchValue=${SearchValue}`);
  }
}
