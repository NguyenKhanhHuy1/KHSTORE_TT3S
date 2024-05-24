/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDERDETAIL_URL } from 'src/app/demo/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(ORDERDETAIL_URL, data);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${ORDERDETAIL_URL + '/'}${id}`);
  }
}
