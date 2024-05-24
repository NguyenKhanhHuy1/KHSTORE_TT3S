/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEARCH_CATEGORY_URL, CATEGORY_URL, CATEGORY_BY_ID_URL } from 'src/app/demo/constants/urls';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    const CategoriesList = this.http.get<Category[]>(CATEGORY_URL);
    console.log(CategoriesList);
    return CategoriesList;
  }
  search(searchValue): Observable<Category[]> {
    const CategoriesList = this.http.get<Category[]>(`${SEARCH_CATEGORY_URL}${searchValue}`);
    console.log(CategoriesList);
    return CategoriesList;
  }
  get(id: any): Observable<Category> {
    return this.http.get<Category>(`${CATEGORY_BY_ID_URL}${id}`);
  }
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(CATEGORY_URL, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${CATEGORY_BY_ID_URL}${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${CATEGORY_BY_ID_URL}${id}`);
  }
}
